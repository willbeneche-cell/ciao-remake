import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'

const VERTEX = `#version 300 es
in vec2 a_quad;
in vec4 a_seed;          // x, rayon en px, vitesse, phase
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_par;
out vec2 v_uv;
out float v_a;

void main() {
  float t = fract(u_time * a_seed.z + a_seed.w);
  float y = -1.18 + t * 2.36;
  float drift = sin(u_time * 0.5 + a_seed.w * 21.0) * 0.028;
  float x = a_seed.x + drift + u_par.x * 0.05;

  vec2 size = vec2(a_seed.y / u_res.x, a_seed.y / u_res.y) * 2.0;
  vec2 pos = vec2(x, y + u_par.y * 0.03) + a_quad * size;

  gl_Position = vec4(pos, 0.0, 1.0);
  v_uv = a_quad;
  v_a = 0.2 * smoothstep(0.0, 0.16, t) * smoothstep(1.0, 0.84, t);
}
`

const FRAGMENT = `#version 300 es
precision mediump float;

in vec2 v_uv;
in float v_a;
uniform vec3 u_color;
out vec4 outColor;

void main() {
  float d = length(v_uv);
  if (d > 1.0) discard;

  float body = smoothstep(1.0, 0.52, d) * 0.5;
  float rim = smoothstep(0.84, 0.96, d) * (1.0 - smoothstep(0.96, 1.0, d));
  float a = (body + rim * 1.35) * v_a;

  outColor = vec4(u_color, a);
}
`

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('[bulles] shader', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function hexToRgb(value: string): [number, number, number] {
  const hex = value.trim().replace('#', '')
  if (hex.length !== 6) return [0.79, 0.23, 0.33]
  return [
    parseInt(hex.slice(0, 2), 16) / 255,
    parseInt(hex.slice(2, 4), 16) / 255,
    parseInt(hex.slice(4, 6), 16) / 255,
  ]
}

/**
 * Un seul contexte WebGL pour tout le site. Champ de bulles piloté
 * entièrement par le shader : pas de calcul JS par frame, donc 60 fps
 * même sur un téléphone moyen de gamme.
 *
 * Aucun montage si prefers-reduced-motion : la version calme n'a pas de canvas.
 */
export function BubbleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const canvas = canvasRef.current
    if (!canvas) return

    const candidate = canvas.getContext('webgl2', {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    })
    if (!candidate) return
    const gl = candidate

    const vert = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vert || !frag) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vert)
    gl.attachShader(program, frag)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[bulles] link', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    const small = window.matchMedia('(max-width: 820px)').matches
    const count = small ? 260 : 900

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    )
    const quadLoc = gl.getAttribLocation(program, 'a_quad')
    gl.enableVertexAttribArray(quadLoc)
    gl.vertexAttribPointer(quadLoc, 2, gl.FLOAT, false, 0, 0)

    const seeds = new Float32Array(count * 4)
    for (let i = 0; i < count; i += 1) {
      seeds[i * 4 + 0] = Math.random() * 2 - 1
      seeds[i * 4 + 1] = 1.6 + Math.random() * 7.4
      seeds[i * 4 + 2] = 0.016 + Math.random() * 0.05
      seeds[i * 4 + 3] = Math.random()
    }
    const seedBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW)
    const seedLoc = gl.getAttribLocation(program, 'a_seed')
    gl.enableVertexAttribArray(seedLoc)
    gl.vertexAttribPointer(seedLoc, 4, gl.FLOAT, false, 0, 0)
    gl.vertexAttribDivisor(seedLoc, 1)

    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uPar = gl.getUniformLocation(program, 'u_par')
    const uColor = gl.getUniformLocation(program, 'u_color')

    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue('--ambiance')
      .trim()
    gl.uniform3fv(uColor, hexToRgb(resolved || '#c93a55'))

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const resize = () => {
      const width = Math.round(canvas.clientWidth * dpr)
      const height = Math.round(canvas.clientHeight * dpr)
      if (canvas.width === width && canvas.height === height) return
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
      gl.uniform2f(uRes, width, height)
    }

    resize()
    window.addEventListener('resize', resize)

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointer = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth) * 2 - 1
      target.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    let frame = 0
    let visible = true
    const onVisibility = () => {
      visible = !document.hidden
      if (visible && !frame) frame = requestAnimationFrame(render)
    }
    document.addEventListener('visibilitychange', onVisibility)

    const start = performance.now()

    function render() {
      frame = 0
      if (!visible) return

      pointer.x += (target.x - pointer.x) * 0.05
      pointer.y += (target.y - pointer.y) * 0.05

      gl.uniform2f(uPar, pointer.x, pointer.y)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count)

      frame = requestAnimationFrame(render)
    }

    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(quad)
      gl.deleteBuffer(seedBuffer)
      gl.deleteProgram(program)
      gl.deleteShader(vert)
      gl.deleteShader(frag)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  )
}
