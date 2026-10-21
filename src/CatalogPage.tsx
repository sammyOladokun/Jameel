import { useMemo, useState, type ReactNode } from 'react'
import './catalog.css'

export type Product = { name: string; type: string; category: string; gender: string; material: string; price: number; image: string; reviews: number }
export const productPhoto = (id: string, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
export const productSlug = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
export const inventory: Product[] = [
  { name: 'Rolex Datejust 41', type: 'Luxury watch', category: 'Watches', gender: 'Men', material: 'Stainless steel', price: 13800000, image: 'photo-1523170335258-f5ed11844a49', reviews: 24 },
  { name: 'Miami Cuban Chain (10mm)', type: 'Gold chain', category: 'Chains', gender: 'Men', material: 'Gold', price: 6200000, image: 'photo-1611591437281-460bfbe1220a', reviews: 18 },
  { name: 'Diamond Tennis Bracelet', type: 'Bracelet', category: 'Bracelets', gender: 'Women', material: 'Diamond', price: 8900000, image: 'photo-1611652022419-a9419f74343d', reviews: 32 },
  { name: 'Royal Oak Automatic', type: 'Luxury watch', category: 'Watches', gender: 'Men', material: 'Stainless steel', price: 24800000, image: 'photo-1524805444758-089113d48a6d', reviews: 12 },
  { name: 'Rolex Submariner', type: 'Luxury watch', category: 'Watches', gender: 'Men', material: 'Stainless steel', price: 17400000, image: 'photo-1524592094714-0f0654e20314', reviews: 20 },
  { name: 'Diamond Engagement Ring', type: 'Ring', category: 'Rings', gender: 'Women', material: 'Diamond', price: 7800000, image: 'photo-1605100804763-247f67b3557e', reviews: 16 },
  { name: 'Rope Chain (5mm)', type: 'Gold chain', category: 'Chains', gender: 'Unisex', material: 'Gold', price: 4350000, image: 'photo-1599643478518-a784e5dc4c8f', reviews: 14 },
  { name: 'Santos Automatic', type: 'Luxury watch', category: 'Watches', gender: 'Men', material: 'Stainless steel', price: 14200000, image: 'photo-1547996160-81dfa63595aa', reviews: 11 },
  { name: 'Cuban Bracelet (8mm)', type: 'Bracelet', category: 'Bracelets', gender: 'Men', material: 'Gold', price: 5600000, image: 'photo-1611591437281-460bfbe1220a', reviews: 17 },
  { name: 'Gold Day-Date 40', type: 'Luxury watch', category: 'Watches', gender: 'Men', material: 'Gold', price: 28500000, image: 'photo-1614164185128-e4ec99c436d7', reviews: 9 },
  { name: 'Diamond Hand Chain', type: 'Hand chain', category: 'Hand Chains', gender: 'Women', material: 'Diamond', price: 2980000, image: 'photo-1617038220319-276d3cfab638', reviews: 22 },
  { name: 'Gold Signet Ring', type: 'Ring', category: 'Rings', gender: 'Unisex', material: 'Gold', price: 2400000, image: 'photo-1605100804763-247f67b3557e', reviews: 13 },
  { name: 'Lion Head Pendant', type: 'Pendant', category: 'Chains', gender: 'Men', material: 'Gold', price: 3200000, image: 'photo-1611652022419-a9419f74343d', reviews: 15 },
  { name: 'GMT Master II', type: 'Luxury watch', category: 'Watches', gender: 'Men', material: 'Stainless steel', price: 16800000, image: 'photo-1523170335258-f5ed11844a49', reviews: 11 },
  { name: 'Diamond Line Bracelet', type: 'Bracelet', category: 'Bracelets', gender: 'Women', material: 'Diamond', price: 7200000, image: 'photo-1611652022419-a9419f74343d', reviews: 21 },
  { name: 'Miami Cuban Chain (12mm)', type: 'Gold chain', category: 'Chains', gender: 'Men', material: 'Gold', price: 6800000, image: 'photo-1611591437281-460bfbe1220a', reviews: 19 },
]
const groups = ['Watches', 'Chains', 'Bracelets', 'Rings', 'Hand Chains']

function CatalogIcon({ name, size = 20, fill = false }: { name: string; size?: number; fill?: boolean }) {
  const paths: Record<string, ReactNode> = {
    search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></>,
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
    bag: <><path d="M4 8h16l-1 13H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    heart: <path d="M20.8 8.6c0 5-8.8 10.2-8.8 10.2S3.2 13.6 3.2 8.6a4.5 4.5 0 0 1 8.8-1.2 4.5 4.5 0 0 1 8.8 1.2Z"/>,
    watch: <><rect x="7" y="6" width="10" height="12" rx="3"/><path d="M9 2h6l1 4H8l1-4ZM8 18h8l-1 4h-6l-1-4Z"/></>,
    chain: <><path d="M4 4c0 7 3.5 11 8 11s8-4 8-11"/><path d="m12 15-2.5 3h5L12 15Z"/></>,
    bracelet: <ellipse cx="12" cy="12" rx="10" ry="5.5"/>,
    ring: <><path d="M7 8.5 9 4h6l2 4.5"/><ellipse cx="12" cy="14" rx="8" ry="6.5"/></>,
    handChain: <><path d="M7 4c0 4 1.5 6 5 8 3.5-2 5-4 5-8"/><path d="M12 12v5M9 19l3-2 3 2"/><circle cx="12" cy="20" r="1.3"/></>,
    searchFilter: <><path d="M4 6h16M7 12h10M10 18h4"/><circle cx="8" cy="6" r="1"/></>,
    next: <path d="m9 18 6-6-6-6"/>,
    arrow: <><path d="M4 12h15M13 5l7 7-7 7"/></>,
    gem: <><path d="m2 9 4-6h12l4 6-10 12L2 9Z"/><path d="M2 9h20M6 3l3 6 3-6 3 6 3-6M9 9l3 12 3-12"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

export default function CatalogPage() {
  const [category, setCategory] = useState<string[]>([])
  const [gender, setGender] = useState<string[]>([])
  const [material, setMaterial] = useState<string[]>([])
  const [priceRanges, setPriceRanges] = useState<string[]>([])
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)
  const [favorites, setFavorites] = useState<string[]>([])
  const [cart, setCart] = useState(0)
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const visibleProducts = useMemo(() => {
    const matching = inventory.filter((item) => {
      const queryMatch = `${item.name} ${item.category} ${item.type}`.toLowerCase().includes(query.toLowerCase().trim())
      const categoryMatch = !category.length || category.includes(item.category)
      const genderMatch = !gender.length || gender.includes(item.gender)
      const materialMatch = !material.length || material.includes(item.material)
      const priceMatch = !priceRanges.length || priceRanges.some((range) => range === 'Under ₦2,000,000' ? item.price < 2000000 : range === '₦2,000,000 – ₦5,000,000' ? item.price >= 2000000 && item.price <= 5000000 : range === '₦5,000,001 – ₦10,000,000' ? item.price > 5000000 && item.price <= 10000000 : item.price > 10000000)
      return queryMatch && categoryMatch && genderMatch && materialMatch && priceMatch
    })
    if (sort === 'low') matching.sort((a, b) => a.price - b.price)
    if (sort === 'high') matching.sort((a, b) => b.price - a.price)
    if (sort === 'name') matching.sort((a, b) => a.name.localeCompare(b.name))
    return matching
  }, [category, gender, material, priceRanges, query, sort])

  const pageSize = 12
  const pageCount = Math.max(1, Math.ceil(visibleProducts.length / pageSize))
  const pageProducts = visibleProducts.slice((page - 1) * pageSize, page * pageSize)
  const activeFilters = category.length + gender.length + material.length + priceRanges.length
  const clearFilters = () => { setCategory([]); setGender([]); setMaterial([]); setPriceRanges([]); setQuery(''); setPage(1) }
  const toggle = (value: string, selected: string[], setSelected: (items: string[]) => void) => { setSelected(selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]); setPage(1) }

  return <main className="catalog-page">
    <div className="catalog-announcement">FREE WORLDWIDE SHIPPING <i>│</i> SECURE PAYMENTS <i>│</i> LIFETIME AUTHENTICITY GUARANTEE</div>
    <header className="header container catalog-topbar">
      <a className="brand" href="/" aria-label="Jameel home"><CatalogIcon name="gem" size={35}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a>
      <nav className="main-nav" aria-label="Main navigation"><a href="/">Home</a><a className="active" href="/catalog" onClick={() => { setCategory([]); setPage(1) }}>Shop</a><a href="#categories">Collections</a><a href="/#testimonials">About</a><a href="/#footer">Contact</a></nav>
      <div className="header-actions"><button aria-label="Open search" onClick={() => setSearchOpen((open) => !open)}><CatalogIcon name={searchOpen ? 'close' : 'search'}/></button><button aria-label="Account"><CatalogIcon name="user"/></button><button aria-label={`Wishlist with ${favorites.length} items`}><CatalogIcon name="heart"/></button><button className="cart-button" aria-label={`Shopping bag with ${cart} items`}><CatalogIcon name="bag"/><span>{cart}</span></button></div>
    </header>
    {searchOpen && <form className="catalog-search" onSubmit={(event) => { event.preventDefault(); setSearchOpen(false) }}><CatalogIcon name="search"/><input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1) }} autoFocus placeholder="Search watches and jewellery" aria-label="Search products"/><button>Search</button></form>}

    <nav className="catalog-categories" id="categories" aria-label="Shop by category">{groups.map((item) => <button key={item} className={category.includes(item) ? 'selected' : ''} onClick={() => { setCategory(category.includes(item) ? [] : [item]); setPage(1) }}><CatalogIcon name={item === 'Watches' ? 'watch' : item === 'Chains' ? 'chain' : item === 'Bracelets' ? 'bracelet' : item === 'Rings' ? 'ring' : 'handChain'} size={34}/><span>{item}</span></button>)}</nav>

    <div className="catalog-layout" id="products">
      <aside className={`catalog-sidebar ${filtersOpen ? 'open' : ''}`}>
        <div className="catalog-filter-head"><b>Filters</b><button onClick={clearFilters}>Clear all</button><button className="catalog-filter-close" aria-label="Close filters" onClick={() => setFiltersOpen(false)}><CatalogIcon name="close" size={17}/></button></div>
        <CatalogFilter title="Category">{groups.map((item) => <FilterChoice key={item} label={`${item} (${inventory.filter((product) => product.category === item).length})`} checked={category.includes(item)} onChange={() => toggle(item, category, setCategory)}/>)}</CatalogFilter>
        <CatalogFilter title="Gender">{['Men', 'Women', 'Unisex'].map((item) => <FilterChoice key={item} label={`${item} (${inventory.filter((product) => product.gender === item).length})`} checked={gender.includes(item)} onChange={() => toggle(item, gender, setGender)}/>)}</CatalogFilter>
        <CatalogFilter title="Material">{['Gold', 'Diamond', 'Platinum', 'Stainless steel'].map((item) => <FilterChoice key={item} label={`${item} (${inventory.filter((product) => product.material === item).length})`} checked={material.includes(item)} onChange={() => toggle(item, material, setMaterial)}/>)}</CatalogFilter>
        <CatalogFilter title="Price range">{['Under ₦2,000,000', '₦2,000,000 – ₦5,000,000', '₦5,000,001 – ₦10,000,000', 'Over ₦10,000,000'].map((item) => <FilterChoice key={item} label={item} checked={priceRanges.includes(item)} onChange={() => toggle(item, priceRanges, setPriceRanges)}/>)}</CatalogFilter>
        <a href="#products" className="catalog-promo"><img src={productPhoto('photo-1617038220319-276d3cfab638', 500)} alt="Fine jewellery styled for an evening"/><span><b>Luxury<br/>looks good<br/>on you</b><small>Premium materials. Timeless designs. Made for those who expect more.</small><strong>Shop all <CatalogIcon name="next" size={14}/></strong></span></a>
      </aside>

      <section className="catalog-listing">
        <div className="catalog-toolbar"><button className="catalog-mobile-filter" onClick={() => setFiltersOpen(true)}><CatalogIcon name="searchFilter" size={17}/> Filters{activeFilters > 0 && <span>{activeFilters}</span>}</button><p>Showing {visibleProducts.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, visibleProducts.length)} of {visibleProducts.length} products</p><label>Sort by: <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name</option></select></label></div>
        {visibleProducts.length ? <div className="catalog-grid">{pageProducts.map((product) => <article className="catalog-item" key={product.name}>
          <div className="catalog-item-photo"><a className="catalog-product-link" href={`/product/${productSlug(product.name)}`} aria-label={`View ${product.name}`}><img src={productPhoto(product.image)} alt={product.name} loading="lazy"/></a><button className={`catalog-heart ${favorites.includes(product.name) ? 'saved' : ''}`} aria-label={`${favorites.includes(product.name) ? 'Remove' : 'Add'} ${product.name} ${favorites.includes(product.name) ? 'from' : 'to'} wishlist`} onClick={() => setFavorites((current) => current.includes(product.name) ? current.filter((name) => name !== product.name) : [...current, product.name])}><CatalogIcon name="heart" size={17} fill={favorites.includes(product.name)}/></button></div>
          <h2><a href={`/product/${productSlug(product.name)}`}>{product.name}</a></h2><p>{product.type}</p><b>₦{product.price.toLocaleString('en-NG')}</b><div className="catalog-rating"><span>★★★★★ <small>({product.reviews})</small></span><button className="catalog-add" onClick={() => setCart((count) => count + 1)}>Add to bag</button></div>
        </article>)}</div> : <div className="catalog-empty"><CatalogIcon name="search" size={28}/><h2>No pieces found</h2><p>Try adjusting your filters to explore more of the collection.</p><button onClick={clearFilters}>Clear filters</button></div>}
        {pageCount > 1 && <nav className="catalog-pages" aria-label="Product pages"><button aria-label="Previous page" disabled={page === 1} onClick={() => setPage((current) => current - 1)}><CatalogIcon name="next" size={14}/></button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} className={number === page ? 'current' : ''} aria-current={number === page ? 'page' : undefined} onClick={() => setPage(number)}>{number}</button>)}<button aria-label="Next page" disabled={page === pageCount} onClick={() => setPage((current) => current + 1)}><CatalogIcon name="next" size={14}/></button></nav>}
      </section>
    </div>

    <footer className="footer" id="footer">
      <div className="container footer-main">
        <div className="footer-brand-block"><a className="brand" href="/"><CatalogIcon name="gem" size={34}/><span>JAMEEL<small>GOLD · DIAMONDS · WATCHES</small></span></a><p>Fine jewellery and watches, chosen to be treasured.</p><a className="footer-email" href="mailto:hello@jameel.ng">hello@jameel.ng</a></div>
        <div className="footer-column"><h3>Explore</h3><a href="/catalog">Shop all</a><a href="/catalog">Watches</a><a href="/catalog">Jewellery</a></div>
        <div className="footer-column"><h3>Customer care</h3><a href="mailto:hello@jameel.ng?subject=Shipping%20and%20delivery">Shipping &amp; delivery</a><a href="mailto:hello@jameel.ng?subject=Returns%20and%20exchanges">Returns &amp; exchanges</a><a href="mailto:hello@jameel.ng?subject=Jewellery%20care">Jewellery care</a></div>
        <div className="footer-column footer-contact"><h3>Get in touch</h3><p>Questions about a piece? We’re happy to help.</p><a href="mailto:hello@jameel.ng">Email our team <CatalogIcon name="arrow" size={14}/></a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Jameel. Made to be treasured.</span><span>Certified pieces · Insured delivery · Secure checkout</span></div>
    </footer>
  </main>
}

function CatalogFilter({ title, children }: { title: string; children: ReactNode }) {
  return <details className="catalog-filter-group" open><summary>{title}<span>⌃</span></summary><div>{children}</div></details>
}

function FilterChoice({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <label className="catalog-choice"><input type="checkbox" checked={checked} onChange={onChange}/><span>{label}</span></label>
}
