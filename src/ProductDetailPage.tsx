import { useMemo, useState, type ReactNode } from 'react'
import { inventory, productPhoto, productSlug } from './CatalogPage'
import './product-detail.css'

function DetailIcon({ name, size = 18 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
    bag: <><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    heart: <path d="M20.8 8.6c0 5-8.8 10.2-8.8 10.2S3.2 13.6 3.2 8.6a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z"/>,
    gem: <><path d="m2 9 4-6h12l4 6-10 12L2 9Z"/><path d="M2 9h20M6 3l3 6 3-6 3 6 3-6M9 9l3 12 3-12"/></>,
    truck: <><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="18" cy="19" r="1.5"/></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>,
    arrows: <><path d="M7 7h13l-3-3M17 17H4l3 3"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    arrow: <><path d="M4 12h15M13 5l7 7-7 7"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export default function ProductDetailPage() {
  const slug = decodeURIComponent(window.location.pathname.split('/').filter(Boolean).pop() ?? '')
  const product = inventory.find((item) => productSlug(item.name) === slug)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [favorite, setFavorite] = useState(false)
  const [added, setAdded] = useState(false)
  const [activeInfo, setActiveInfo] = useState('Details')
  const gallery = useMemo(() => product ? [product.image, ...inventory.filter((item) => item.name !== product.name).slice(0, 4).map((item) => item.image)] : [], [product])

  if (!product) return <main className="detail-page"><div className="detail-missing"><h1>Piece not found</h1><a href="/catalog">Return to the collection</a></div></main>

  const recommendations = inventory.filter((item) => item.name !== product.name).slice(0, 5)
  const price = `₦${product.price.toLocaleString('en-NG')}`
  const addToBag = () => { setAdded(true); window.setTimeout(() => setAdded(false), 2200) }

  return <main className="detail-page">
    <header className="header container detail-topbar">
      <a className="brand" href="/" aria-label="Jameel home"><DetailIcon name="gem" size={35}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a>
      <nav className="main-nav" aria-label="Main navigation"><a href="/">Home</a><a className="active" href="/catalog">Shop</a><a href="/catalog#categories">Collections</a><a href="/#testimonials">About</a><a href="/#footer">Contact</a></nav>
      <div className="header-actions"><button aria-label="Search"><DetailIcon name="search"/></button><button aria-label="Account"><DetailIcon name="user"/></button><button aria-label="Wishlist"><DetailIcon name="heart"/></button><button className="cart-button" aria-label="Shopping bag"><DetailIcon name="bag"/><span>0</span></button></div>
    </header>

    <div className="detail-breadcrumb container"><a href="/catalog">Shop</a><DetailIcon name="chevron" size={12}/><a href={`/catalog#${product.category.toLowerCase().replaceAll(' ', '-')}`}>{product.category}</a><DetailIcon name="chevron" size={12}/><span>{product.name}</span></div>

    <section className="detail-main container">
      <div className="detail-gallery">
        <div className="detail-thumbnails" aria-label="Product images">{gallery.map((image, index) => <button key={`${image}-${index}`} className={index === galleryIndex ? 'active' : ''} onClick={() => setGalleryIndex(index)} aria-label={`Show product image ${index + 1}`}><img src={productPhoto(image, 180)} alt=""/></button>)}</div>
        <div className="detail-hero-image"><img src={productPhoto(gallery[galleryIndex], 1100)} alt={product.name}/><span className="detail-new">New</span><button className={`detail-favorite ${favorite ? 'saved' : ''}`} onClick={() => setFavorite((value) => !value)} aria-label={favorite ? 'Remove from wishlist' : 'Add to wishlist'}><DetailIcon name="heart" size={18}/></button><button className="gallery-arrow previous" onClick={() => setGalleryIndex((index) => (index - 1 + gallery.length) % gallery.length)} aria-label="Previous image"><DetailIcon name="chevron" size={15}/></button><button className="gallery-arrow next" onClick={() => setGalleryIndex((index) => (index + 1) % gallery.length)} aria-label="Next image"><DetailIcon name="chevron" size={15}/></button></div>
      </div>

      <div className="detail-info">
        <span className="detail-eyebrow">{product.type}</span><h1>{product.name}</h1><p className="detail-subtitle">{product.material} · {product.gender === 'Unisex' ? 'Unisex' : product.gender} · Jameel selection</p>
        <div className="detail-reviews"><span>★★★★★</span><small>({product.reviews} reviews)</small></div>
        <strong className="detail-price">{price}</strong><p className="detail-stock">In stock <i/> Free worldwide shipping</p>
        <p className="detail-description">A timeless piece, selected for exceptional craftsmanship and enduring style. Expertly finished with carefully chosen materials and inspected by our jewellery specialists.</p>
        <label className="quantity-label">Quantity</label><div className="quantity-control"><button onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button><span>{quantity}</span><button onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">+</button></div>
        <button className="detail-add-button" onClick={addToBag}>{added ? 'Added to bag' : 'Add to bag'} <DetailIcon name={added ? 'check' : 'bag'} size={15}/></button><button className="detail-buy-button" onClick={addToBag}>Buy it now</button>
        <div className="detail-assurances"><span><DetailIcon name="shield" size={16}/>100% authentic</span><span><DetailIcon name="globe" size={16}/>Free worldwide shipping</span><span><DetailIcon name="arrows" size={16}/>Lifetime warranty</span></div>
      </div>
    </section>

    <section className="detail-information container" aria-label="About this piece">
      <div className="detail-section-heading"><span>JAMEEL PRODUCT GUIDE</span><h2>About this piece</h2></div>
      <div className="detail-tabs" role="tablist" aria-label="Product information tabs">{['Details', 'Specifications', 'Shipping & returns', 'Authenticity'].map((tab) => <button key={tab} role="tab" aria-selected={activeInfo === tab} className={activeInfo === tab ? 'active' : ''} onClick={() => setActiveInfo(tab)}>{tab}</button>)}</div>
      <div className="detail-panel" role="tabpanel">
        {activeInfo === 'Details' && <div className="detail-story"><div className="detail-story-image"><img src={productPhoto(product.image, 1000)} alt={`${product.name} craftsmanship detail`}/></div><div className="detail-story-copy"><span>Timeless elegance</span><h2>A legacy of<br/>excellence</h2><p>Every Jameel piece is chosen for its exceptional character, beautiful finish, and enduring value. From the first sketch to the final inspection, every detail is considered and refined.</p><ul><li><DetailIcon name="check"/>Selected for lasting quality</li><li><DetailIcon name="check"/>Expertly finished by skilled artisans</li><li><DetailIcon name="check"/>Inspected before dispatch</li><li><DetailIcon name="check"/>Arrives in signature Jameel packaging</li></ul></div><div className="detail-craft-images"><img src={productPhoto('photo-1599643478518-a784e5dc4c8f', 500)} alt="Fine jewellery craftsmanship"/><img src={productPhoto('photo-1611652022419-a9419f74343d', 500)} alt="A polished jewellery detail"/><img src={productPhoto('photo-1605100804763-247f67b3557e', 500)} alt="A carefully finished detail"/></div></div>}
        {activeInfo === 'Specifications' && <div className="detail-feature-panel"><div className="detail-story-image"><img src={productPhoto(product.image, 900)} alt={`${product.name} product detail`}/></div><div className="detail-feature-copy"><span>Product information</span><h2>Specifications</h2><dl><div><dt>Piece</dt><dd>{product.name}</dd></div><div><dt>Category</dt><dd>{product.category}</dd></div><div><dt>Material</dt><dd>{product.material}</dd></div><div><dt>Collection</dt><dd>{product.gender}</dd></div></dl></div></div>}
        {activeInfo === 'Shipping & returns' && <div className="detail-feature-panel"><div className="detail-story-image"><img src={productPhoto('photo-1605100804763-247f67b3557e', 900)} alt="Jameel jewellery prepared for delivery"/></div><div className="detail-feature-copy"><span>Delivery, with care</span><h2>Shipping &amp; returns</h2><p>Complimentary worldwide delivery is available on this piece. Each order is carefully packed and shipped with tracking. For help with a return or exchange, contact our team within 14 days of delivery.</p><a href="mailto:hello@jameel.ng?subject=Shipping%20and%20returns">Contact customer care <DetailIcon name="arrow" size={14}/></a></div></div>}
        {activeInfo === 'Authenticity' && <div className="detail-feature-panel"><div className="detail-story-image"><img src={productPhoto('photo-1599643478518-a784e5dc4c8f', 900)} alt="Close detail of fine jewellery"/></div><div className="detail-feature-copy"><span>Confidence in every piece</span><h2>Authenticity</h2><p>Every item in the Jameel collection is reviewed by our team before dispatch. Your piece arrives with its product information and presentation packaging.</p><ul><li><DetailIcon name="check"/>Inspected before dispatch</li><li><DetailIcon name="check"/>Product details included</li><li><DetailIcon name="check"/>Supported by our customer care team</li></ul></div></div>}
      </div>
    </section>

    <section className="detail-related container"><div className="related-heading"><div><span>You may also like</span><p>Discover more timeless pieces</p></div><a href="/catalog">View all <DetailIcon name="arrow" size={14}/></a></div><div className="related-grid">{recommendations.map((item) => <a className="related-product" href={`/product/${productSlug(item.name)}`} key={item.name}><img src={productPhoto(item.image, 500)} alt={item.name}/><h3>{item.name}</h3><p>{item.type}</p><b>₦{item.price.toLocaleString('en-NG')}</b><small>★★★★★ ({item.reviews})</small></a>)}</div></section>

    <footer className="footer" id="footer"><div className="container footer-main"><div className="footer-brand-block"><a className="brand" href="/"><DetailIcon name="gem" size={34}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a><p>Fine jewellery and watches, chosen to be treasured.</p><a className="footer-email" href="mailto:hello@jameel.ng">hello@jameel.ng</a></div><div className="footer-column"><h3>Explore</h3><a href="/catalog">Shop all</a><a href="/catalog">Watches</a><a href="/catalog">Jewellery</a></div><div className="footer-column"><h3>Customer care</h3><a href="mailto:hello@jameel.ng?subject=Shipping%20and%20delivery">Shipping &amp; delivery</a><a href="mailto:hello@jameel.ng?subject=Returns%20and%20exchanges">Returns &amp; exchanges</a><a href="mailto:hello@jameel.ng?subject=Jewellery%20care">Jewellery care</a></div><div className="footer-column footer-contact"><h3>Get in touch</h3><p>Questions about a piece? We’re happy to help.</p><a href="mailto:hello@jameel.ng">Email our team <DetailIcon name="arrow" size={14}/></a></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Jameel. Made to be treasured.</span><span>Certified pieces · Insured delivery · Secure checkout</span></div></footer>
  </main>
}
