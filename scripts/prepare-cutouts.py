"""
Prépare les bouteilles pour le web.

- Les PNG déjà détourés (canal alpha) sont simplement recadrés sur leur boîte englobante.
- Les PNG sur fond blanc (cerise, litchi) sont détourés par remplissage depuis les bords :
  on ne retire que le blanc CONNECTÉ au bord, donc les reflets blancs enfermés dans
  le verre sont préservés.
- Sortie : un PNG RGBA recadré par saveur dans assets-work/cut/.
"""

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

SRC = Path("image")
OUT = Path("assets-work/cut")
MARGIN = 10

FLAVORS = [
    "cerise",
    "citron",
    "dragon",
    "fruits_rouges",
    "gingembre_hibiscus",
    "litchi",
    "mangue_passion",
    "menthe",
    "pasteque",
    "peche",
]


def flood_background(white: np.ndarray) -> np.ndarray:
    """Marque le blanc relié au bord de l'image."""
    h, w = white.shape
    bg = np.zeros((h, w), dtype=bool)
    queue: deque[tuple[int, int]] = deque()

    for x in range(w):
        for y in (0, h - 1):
            if white[y, x] and not bg[y, x]:
                bg[y, x] = True
                queue.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if white[y, x] and not bg[y, x]:
                bg[y, x] = True
                queue.append((y, x))

    while queue:
        y, x = queue.popleft()
        for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
            if 0 <= ny < h and 0 <= nx < w and white[ny, nx] and not bg[ny, nx]:
                bg[ny, nx] = True
                queue.append((ny, nx))
    return bg


def erode(mask: np.ndarray, steps: int) -> np.ndarray:
    """Érosion 4-voisins, peu coûteuse, pour ne pas laisser d'auréole."""
    out = mask.copy()
    for _ in range(steps):
        e = out.copy()
        e[1:, :] &= out[:-1, :]
        e[:-1, :] &= out[1:, :]
        e[:, 1:] &= out[:, :-1]
        e[:, :-1] &= out[:, 1:]
        e[0, :] = False
        e[-1, :] = False
        e[:, 0] = False
        e[:, -1] = False
        out = e
    return out


def matte_from_white(path: Path, threshold: int = 246) -> Image.Image:
    rgb = Image.open(path).convert("RGB")
    arr = np.asarray(rgb)
    h, w, _ = arr.shape

    white = (
        (arr[:, :, 0] >= threshold)
        & (arr[:, :, 1] >= threshold)
        & (arr[:, :, 2] >= threshold)
    )
    bg = flood_background(white)

    alpha = np.where(bg, 0, 255).astype(np.uint8)
    soft = np.asarray(
        Image.fromarray(alpha, "L").filter(ImageFilter.GaussianBlur(0.7))
    ).copy()
    # on force le fond profond à zéro (le flou a pu y remonter)
    soft[erode(bg, 3)] = 0
    # le bord extérieur garde une transition douce, mais jamais > 235 px d'auréole
    out = rgb.convert("RGBA")
    out.putalpha(Image.fromarray(soft, "L"))
    return out


def crop_to_content(img: Image.Image, margin: int = MARGIN) -> Image.Image:
    bbox = img.split()[3].getbbox()
    if not bbox:
        return img
    x0, y0, x1, y1 = bbox
    x0 = max(0, x0 - margin)
    y0 = max(0, y0 - margin)
    x1 = min(img.width, x1 + margin)
    y1 = min(img.height, y1 + margin)
    return img.crop((x0, y0, x1, y1))


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for slug in FLAVORS:
        src = SRC / f"kombucha_{slug}.png"
        img = Image.open(src)
        has_alpha = img.mode in ("RGBA", "LA") or "transparency" in img.info

        if has_alpha:
            cut = img.convert("RGBA")
            method = "alpha existant"
        else:
            cut = matte_from_white(src)
            method = "détouré depuis le blanc"

        cut = crop_to_content(cut)
        dst = OUT / f"{slug}.png"
        cut.save(dst)
        print(f"{slug:20s} {cut.width}x{cut.height}  ({method})")


if __name__ == "__main__":
    main()
