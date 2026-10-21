import { useMemo, useState, type ReactNode } from 'react'

type Product = { name: string; detail: string; price: string; category: string; image: string }

const products: Product[] = [
  { name: 'The Heirloom Watch', detail: 'Steel · Diamond-set', price: '₦3,850,000', category: 'Watches', image: 'photo-1523170335258-f5ed11844a49' },
  { name: 'Cuban Link Chain', detail: 'White gold · 18k', price: '₦2,650,000', category: 'Chains', image: 'photo-1611591437281-460bfbe1220a' },
  { name: 'Tennis Bracelet', detail: 'White gold · Diamonds', price: '₦1,980,000', category: 'Bracelets', image: 'photo-1611652022419-a9419f74343d' },
  { name: 'Solitaire Ring', detail: '18k white gold', price: '₦1,250,000', category: 'Rings', image: 'photo-1605100804763-247f67b3557e' },
]

const imageUrl = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const }
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
    heart: <path d="M20.8 8.6c0 5-8.8 10.2-8.8 10.2S3.2 13.6 3.2 8.6a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z"/>,
    bag: <><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    gem: <><path d="m2 9 4-6h12l4 6-10 12L2 9Z"/><path d="M2 9h20M6 3l3 6 3-6 3 6 3-6M9 9l3 12 3-12"/></>,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    headset: <><path d="M3 13v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 19a5 5 0 0 1-5 3h-1"/></>,
    arrow: <><path d="M4 12h15M13 5l7 7-7 7"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

function App() {
  const [category, setCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [cartCount, setCartCount] = useState(0)
  const categories = ['All', 'Watches', 'Chains', 'Bracelets', 'Rings']
  const visibleProducts = useMemo(() => category === 'All' ? products : products.filter((product) => product.category === category), [category])

  function toggleFavorite(name: string) {
    setFavorites((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])
  }

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-backdrop" />
        <header className="header container">
          <a className="brand" href="#home" aria-label="Jameel home"><Icon name="gem" size={35}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a>
          <nav className="main-nav" aria-label="Main navigation"><a className="active" href="#home">Home</a><a href="#collection">Shop</a><a href="#collection">Collections</a><a href="#why-us">About</a><a href="#footer">Contact</a></nav>
          <div className="header-actions"><button aria-label="Search"><Icon name="search"/></button><button aria-label="Account"><Icon name="user"/></button><button aria-label={`Wishlist, ${favorites.length} items`}><Icon name="heart"/></button><button className="cart-button" aria-label={`Shopping bag, ${cartCount} items`}><Icon name="bag"/><span>{cartCount}</span></button></div>
        </header>

        <div className="hero-content container">
          <p className="eyebrow">Premium jewellery & watches</p>
          <h1>Timeless elegance<br/>for every moment</h1>
          <p className="hero-copy">Exquisite gold, dazzling diamonds, and statement watches<br className="desktop-break"/> crafted for those who value luxury, style and legacy.</p>
          <a className="button button-light" href="#collection">Shop collection <Icon name="arrow" size={16}/></a>
        </div>
        <div className="hero-caption">THE JAMEEL EDIT · Nº 01</div>
      </section>

      <section className="trust-strip" aria-label="Our service promises"><div className="container trust-grid">
        <div className="trust-item"><Icon name="gem" size={32}/><span><b>100% Authentic</b><small>Genuine & certified products</small></span></div>
        <div className="trust-item"><Icon name="truck" size={32}/><span><b>Worldwide shipping</b><small>Safe & insured delivery</small></span></div>
        <div className="trust-item"><Icon name="shield" size={32}/><span><b>Secure payments</b><small>Multiple payment options</small></span></div>
        <div className="trust-item"><Icon name="headset" size={32}/><span><b>Here for you</b><small>Personal client care</small></span></div>
      </div></section>

      <section className="section container" id="why-us">
        <SectionHeading eyebrow="Why choose us" title="More than just jewellery" subtitle="We offer more than beautiful pieces — we deliver trust, quality and a luxury experience you can count on."/>
        <div className="benefits-grid">
          <article className="benefit-card"><span className="icon-ring"><Icon name="gem" size={30}/></span><div><h3>Premium quality</h3><p>Only the finest gold, diamonds and watches.</p></div></article>
          <article className="benefit-card"><span className="icon-ring"><Icon name="shield" size={30}/></span><div><h3>Trusted authenticity</h3><p>Every piece is certified and professionally inspected.</p></div></article>
          <article className="benefit-card"><span className="icon-ring"><Icon name="truck" size={30}/></span><div><h3>Elegant packaging</h3><p>Luxury packaging, perfect for gifting or self-indulgence.</p></div></article>
        </div>
      </section>

      <section className="section how-section container">
        <SectionHeading eyebrow="How it works" title="Your perfect piece, made easy" subtitle="Shop in just a few clicks and have your favourite jewellery delivered to your door."/>
        <div className="steps-grid">
          {[
            { title: 'Browse collection', copy: 'Explore our range of gold, diamond and luxury jewellery.', image: 'photo-1611652022419-a9419f74343d', label: 'Discover the collection' },
            { title: 'Choose your favourite', copy: 'Find a piece that feels like it was made for you.', image: 'photo-1523170335258-f5ed11844a49', label: 'Find your favourite' },
            { title: 'Checkout securely', copy: 'Pay safely with your preferred payment option.', icon: 'payments' },
            { title: 'Delivered with care', copy: 'Your order arrives safely, insured and beautifully packed.', image: 'photo-1605100804763-247f67b3557e', label: 'Beautifully packaged' },
            { title: 'Wear it your way', copy: 'Enjoy a timeless piece and make every moment special.', image: 'photo-1611591437281-460bfbe1220a', label: 'A piece to treasure' },
          ].map((step, index) => <article className="step-card" key={step.title}>
            <span className="step-number">0{index + 1}</span><h3>{step.title}</h3><p>{step.copy}</p>
            {step.image ? <img src={imageUrl(step.image, 480)} alt={step.label} loading="lazy"/> : <div className="payment-choices"><span>VISA</span><span className="mastercard">●●</span><span>PayPal</span><span><Icon name="shield" size={15}/> Secure payment</span></div>}
          </article>)}
        </div>
      </section>

      <section className="section collection-section container" id="collection">
        <SectionHeading eyebrow="Featured collection" title="Our best sellers" subtitle="Timeless pieces. Unmatched quality. Loved by many."/>
        <div className="category-tabs" role="tablist" aria-label="Filter products">{categories.map((item) => <button key={item} role="tab" aria-selected={category === item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>
        <div className="product-grid">
          {visibleProducts.map((product) => <article className="product-card" key={product.name}>
            <div className="product-image"><img src={imageUrl(product.image, 700)} alt={product.name} loading="lazy"/><button className={`favorite ${favorites.includes(product.name) ? 'is-favorite' : ''}`} onClick={() => toggleFavorite(product.name)} aria-label={`${favorites.includes(product.name) ? 'Remove' : 'Add'} ${product.name} ${favorites.includes(product.name) ? 'from' : 'to'} wishlist`}><Icon name="heart" size={18}/></button></div>
            <div className="product-info"><div><h3>{product.name}</h3><p>{product.detail}</p><b>{product.price}</b></div><button className="product-add" aria-label={`Add ${product.name} to bag`} onClick={() => setCartCount((count) => count + 1)}><Icon name="arrow" size={17}/></button></div>
          </article>)}
        </div>
      </section>

      <section className="section testimonials-section container">
        <SectionHeading eyebrow="Kind words" title="Trusted by thousands" subtitle="Real people. Real experiences. Pieces made to last."/>
        <div className="reviews-grid">
          {[
            { name: 'Daniel K.', place: 'Lagos, Nigeria', quote: 'The quality is unbelievable! My watch came exactly as shown and the packaging was top notch. I will definitely shop again.', initials: 'DK' },
            { name: 'Amara T.', place: 'Abuja, Nigeria', quote: 'Jameel never disappoints. The chain is pure gold and the sparkle is real. Legit and trustworthy!', initials: 'AT' },
            { name: 'Tunde S.', place: 'Port Harcourt, Nigeria', quote: 'Fast delivery, excellent customer service and premium quality. This is my go-to jewellery store now.', initials: 'TS' },
          ].map((review) => <article className="review-card" key={review.name}><div className="review-top"><span className="avatar">{review.initials}</span><span className="stars" aria-label="5 out of 5 stars">★★★★★</span></div><blockquote>“{review.quote}”</blockquote><b>{review.name}</b><small>{review.place}</small></article>)}
        </div>
      </section>

      <footer className="footer" id="footer"><div className="container footer-inner">
        <a className="brand" href="#home"><Icon name="gem" size={34}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a>
        <nav aria-label="Footer navigation"><a href="#home">Home</a><a href="#collection">Shop</a><a href="#collection">Collections</a><a href="#why-us">About</a><a href="mailto:hello@jameel.ng">Contact</a></nav>
        <div className="social-links" aria-label="Social media"><a href="#footer" aria-label="Instagram">ig</a><a href="#footer" aria-label="TikTok">tk</a><a href="#footer" aria-label="Facebook">f</a></div>
        <span className="footer-note">Luxury is a feeling.</span>
      </div><p className="copyright">© {new Date().getFullYear()} Jameel. Made to be treasured.</p></footer>
    </main>
  )
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <div className="section-heading"><span className="section-eyebrow">{eyebrow}</span><h2>{title}</h2><p>{subtitle}</p></div>
}

export default App
