import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './how-steps.css'
import './testimonials.css'
import './section-dividers.css'
import './featured-collection.css'
import './footer.css'
import './mobile-hero.css'
import './trust-strip.css'
import './hero-cta.css'
import './hero-carousel.css'
import './page-gradient.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
