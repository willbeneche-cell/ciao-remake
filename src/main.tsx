import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'

const container = document.getElementById('root')
if (!container) throw new Error('Élément #root introuvable')

createRoot(container).render(<App />)
