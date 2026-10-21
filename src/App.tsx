import { useEffect, useMemo, useState, type ReactNode } from 'react'
import CatalogPage from './CatalogPage'

type Product = { name: string; detail: string; price: string; category: string; image: string }

const products: Product[] = [
  { name: 'The Heirloom Watch', detail: 'Steel · Diamond-set', price: '₦3,850,000', category: 'Watches', image: 'photo-1523170335258-f5ed11844a49' },
  { name: 'Cuban Link Chain', detail: 'White gold · 18k', price: '₦2,650,000', category: 'Chains', image: 'photo-1611591437281-460bfbe1220a' },
  { name: 'Tennis Bracelet', detail: 'White gold · Diamonds', price: '₦1,980,000', category: 'Bracelets', image: 'photo-1611652022419-a9419f74343d' },
  { name: 'Solitaire Ring', detail: '18k white gold', price: '₦1,250,000', category: 'Rings', image: 'photo-1605100804763-247f67b3557e' },
]

const imageUrl = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const heroSlides = [
  { image: 'photo-1523170335258-f5ed11844a49', label: 'A timeless luxury watch' },
  { image: 'photo-1605100804763-247f67b3557e', label: 'A diamond ring' },
  { image: 'photo-1611591437281-460bfbe1220a', label: 'Fine gold jewellery' },
  { image: 'photo-1573273256429-b4cd0434fb96', label: 'Gold Cuban Link Chain' },
  { image: 'photo-1636289039346-ac54cc941975', label: 'A gold watch with diamonds' },
]

function Icon({ name, size = 20, filled = false }: { name: string; size?: number; filled?: boolean }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: filled ? '#e54855' : 'none', stroke: filled ? '#e54855' : 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
    heart: <path d="M20.8 8.6c0 5-8.8 10.2-8.8 10.2S3.2 13.6 3.2 8.6a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z"/>,
    bag: <><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    gem: <><path d="m2 9 4-6h12l4 6-10 12L2 9Z"/><path d="M2 9h20M6 3l3 6 3-6 3 6 3-6M9 9l3 12 3-12"/></>,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    creditCard: <><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6.5 15h3"/></>,
    headset: <><path d="M3 13v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 19a5 5 0 0 1-5 3h-1"/></>,
    arrow: <><path d="M4 12h15M13 5l7 7-7 7"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    collection: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    ring: <><path d="M7 8.5 9 4h6l2 4.5"/><ellipse cx="12" cy="14" rx="8" ry="6.5"/></>,
    necklace: <><path d="M4 4c0 7 3.5 11 8 11s8-4 8-11"/><path d="m12 15-2.5 3h5L12 15Z"/></>,
    bracelet: <ellipse cx="12" cy="12" rx="10" ry="5.5"/>,
    watch: <><rect x="7" y="6" width="10" height="12" rx="3"/><path d="M9 2h6l1 4H8l1-4ZM8 18h8l-1 4h-6l-1-4Z"/></>,
    all: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    sparkle: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

function LandingPage() {
  const [category, setCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [heroTransitionEnabled, setHeroTransitionEnabled] = useState(true)
  const categories = ['All', 'Watches', 'Chains', 'Bracelets', 'Rings']
  const visibleProducts = useMemo(() => category === 'All' ? products : products.filter((product) => product.category === category), [category])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveHeroSlide((current) => (current + 1) % heroSlides.length)
    }, 6000)
    return () => window.clearInterval(timer)
  }, [])

  function handleHeroTransitionEnd() {
    if (activeHeroSlide === heroSlides.length) {
      setHeroTransitionEnabled(false)
      setActiveHeroSlide(0)
      window.setTimeout(() => setHeroTransitionEnabled(true), 40)
    }
  }

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-slides" onTransitionEnd={handleHeroTransitionEnd} style={{ transform: `translateX(-${activeHeroSlide * 100}%)`, transition: heroTransitionEnabled ? undefined : 'none' }} aria-hidden="true">
          {[...heroSlides, heroSlides[0]].map((slide, index) => <div className="hero-slide" key={`${slide.image}-${index}`} style={{ backgroundImage: `url('${imageUrl(slide.image, 2200)}')` }} />)}
        </div>
        <div className="hero-backdrop" />
        <header className="header container">
          <a className="brand" href="#home" aria-label="Jameel home"><Icon name="gem" size={35}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a>
          <nav className="main-nav" aria-label="Main navigation"><a className="active" href="#home">Home</a><a href="/catalog">Shop</a><a href="/catalog">Collections</a><a href="#testimonials">About</a><a href="#footer">Contact</a></nav>
          <div className="header-actions"><button aria-label="Search"><Icon name="search"/></button><button aria-label="Account"><Icon name="user"/></button><button aria-label={`Wishlist, ${favorites.length} items`}><Icon name="heart"/></button><button className="cart-button" aria-label={`Shopping bag, ${cartCount} items`}><Icon name="bag"/><span>{cartCount}</span></button></div>
        </header>
        <div className="hero-content container">
          <h1>Timeless elegance<br/>for every moment</h1>
          <p className="hero-copy">Exquisite gold, dazzling diamonds, and statement watches<br className="desktop-break"/> crafted for those who value luxury, style and legacy.</p>
          <a className="button button-light" href="/catalog">Shop collection <Icon name="arrow" size={16}/></a>
        </div>
        <div className="hero-carousel"><div className="hero-dots" role="group" aria-label={`Hero image ${activeHeroSlide % heroSlides.length + 1} of ${heroSlides.length}`}>
          {heroSlides.map((slide, index) => <button key={slide.image} className={activeHeroSlide % heroSlides.length === index ? 'active' : ''} onClick={() => setActiveHeroSlide(index)} aria-label={`Show image: ${slide.label}`} aria-current={activeHeroSlide % heroSlides.length === index ? 'true' : undefined}/>) }
        </div></div>
      </section>

      <section className="trust-strip" aria-label="Our service promises"><div className="container trust-grid">
        <div className="trust-item"><Icon name="gem" size={32}/><span><b>100% Authentic</b><small>Genuine &amp; certified products</small></span></div>
        <div className="trust-item"><Icon name="truck" size={32}/><span><b>Worldwide shipping</b><small>Safe &amp; insured delivery</small></span></div>
        <div className="trust-item"><Icon name="shield" size={32}/><span><b>Secure payments</b><small>Multiple payment options</small></span></div>
        <div className="trust-item"><Icon name="headset" size={32}/><span><b>Here for you</b><small>Personal client care</small></span></div>
      </div></section>

      <section className="section testimonials-section container" id="testimonials">
        <SectionHeading eyebrow="Trusted by thousands" title="" subtitle="Real people. Real experiences. Pieces made to last."/>
        <div className="reviews-grid">
          {[
            { name: 'Daniel K.', place: 'Lagos, Nigeria', quote: 'The quality is unbelievable! My watch came exactly as shown and the packaging was top notch. I will definitely shop again.', initials: 'DK' },
            { name: 'Amara T.', place: 'Abuja, Nigeria', quote: 'Jameel never disappoints. The chain is pure gold and the sparkle is real. Legit and trustworthy!', initials: 'AT' },
            { name: 'Tunde S.', place: 'Port Harcourt, Nigeria', quote: 'Fast delivery, excellent customer service and premium quality. This is my go-to jewellery store now.', initials: 'TS' },
          ].map((review) => <article className="review-card" key={review.name}><div className="review-top"><span className="avatar">{review.initials}</span><span className="stars" aria-label="5 out of 5 stars">★★★★★</span></div><blockquote>“{review.quote}”</blockquote><b>{review.name}</b><small>{review.place}</small></article>)}
        </div>
      </section>

      <section className="section how-section container">
        <SectionHeading eyebrow="Your perfect piece, made easy" title="" subtitle="Shop in just a few clicks and have your favourite jewellery delivered to your door."/>
        <div className="steps-grid">
          {[
            { title: 'Browse collection', copy: 'Explore our range of gold, diamond and luxury jewellery.', icon: 'collection' },
            { title: 'Choose your favourite', copy: 'Find a piece that feels like it was made for you.', icon: 'heart' },
            { title: 'Checkout securely', copy: 'Pay safely with your preferred payment option.', icon: 'creditCard' },
            { title: 'Delivered with care', copy: 'Your order arrives safely, insured and beautifully packed.', icon: 'truck' },
            { title: 'Wear it your way', copy: 'Enjoy a timeless piece and make every moment special.', icon: 'sparkle' },
          ].map((step, index) => <article className="step-card" key={step.title}>
            <span className="step-showcase-number">0{index + 1}</span>
            <span className={`step-icon step-icon--${step.icon}`}><Icon name={step.icon} size={34} filled={step.icon === 'heart'}/></span>
            <h3>{step.title}</h3><p>{step.copy}</p>
          </article>)}
        </div>
      </section>

      <section className="section collection-section container" id="collection">
        <SectionHeading eyebrow="Our best sellers" title="" subtitle="Timeless pieces. Unmatched quality. Loved by many."/>
        <div className="category-tabs" role="tablist" aria-label="Filter products">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}><Icon name={item === 'All' ? 'all' : item === 'Watches' ? 'watch' : item === 'Chains' ? 'necklace' : item === 'Bracelets' ? 'bracelet' : 'ring'} size={23}/><span>{item === 'Chains' ? 'Necklaces' : item}</span></button>)}</div>
        <div className="product-grid">
          {visibleProducts.map((product) => <article className="product-card" key={product.name}>
            <div className="product-image"><img src={imageUrl(product.image, 700)} alt={product.name} loading="lazy"/><button className={`favorite ${favorites.includes(product.name) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.name)} aria-label={`${favorites.includes(product.name) ? 'Remove' : 'Add'} ${product.name} ${favorites.includes(product.name) ? 'from' : 'to'} wishlist`}><Icon name="heart" size={18}/></button></div>
            <div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p><b>{product.price}</b></div><button className="product-add" aria-label={`Add ${product.name} to bag`} onClick={() => setCartCount((count) => count + 1)}><Icon name="arrow" size={17}/></button></div>
          </article>)}
        </div>
      </section>

      <footer className="footer" id="footer">
        <div className="container footer-main">
          <div className="footer-brand-block"><a className="brand" href="#home"><Icon name="gem" size={34}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a><p>Fine jewellery and watches, chosen to be treasured.</p><a className="footer-email" href="mailto:hello@jameel.ng">hello@jameel.ng</a></div>
          <div className="footer-column"><h3>Explore</h3><a href="#collection">Shop all</a><a href="#collection">Watches</a><a href="#collection">Jewellery</a></div>
          <div className="footer-column"><h3>Customer care</h3><a href="mailto:hello@jameel.ng?subject=Shipping%20and%20delivery">Shipping &amp; delivery</a><a href="mailto:hello@jameel.ng?subject=Returns%20and%20exchanges">Returns &amp; exchanges</a><a href="mailto:hello@jameel.ng?subject=Jewellery%20care">Jewellery care</a></div>
          <div className="footer-column footer-contact"><h3>Get in touch</h3><p>Questions about a piece? We’re happy to help.</p><a href="mailto:hello@jameel.ng">Email our team <Icon name="arrow" size={14}/></a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Jameel. Made to be treasured.</span><span>Certified pieces · Insured delivery · Secure checkout</span></div>
      </footer>
    </main>
  )
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <div className="section-heading"><span className="section-eyebrow">{eyebrow}</span>{title && <h2>{title}</h2>}<p>{subtitle}</p></div>
}

function App() {
  return window.location.pathname.replace(/\/+$/, '') === '/catalog' ? <CatalogPage/> : <LandingPage/>
}

export default App
