import { useEffect, useMemo, useState } from 'react'
import './pricelist.css'
import { MEDIA } from '../constants/index'
import { apiClient } from '../lib/apiClient'

const makeRows = () => {
  const base = [
    {
      id: '1',
      article_no: '1234567890',
      name: 'This is a test product with fifty characters this!',
      in_price: '900500',
      price: '1500800',
      unit: 'kilometers/hour',
      in_stock: '2500600',
      description: 'This is the description with fifty characters this',
    },
    {
      id: '2',
      article_no: '1234567891',
      name: 'Sony DSLR 12345',
      in_price: '5000',
      price: '15000',
      unit: 'pcs',
      in_stock: '500',
      description: 'Camera package',
    },
    {
      id: '3',
      article_no: '1234567892',
      name: 'Random product',
      in_price: '600',
      price: '1234',
      unit: 'box',
      in_stock: '120',
      description: 'Random item',
    },
  ]

  const rows = [...base]
  for (let i = 4; i <= 20; i += 1) {
    rows.push({
      id: String(i),
      article_no: `1234567${String(i).padStart(3, '0')}`,
      name: `Sample product ${i}`,
      in_price: String(1000 + i * 17),
      price: String(3000 + i * 33),
      unit: i % 2 === 0 ? 'pcs' : 'month',
      in_stock: String(100 + i * 5),
      description: `Description item ${i}`,
    })
  }
  return rows
}

const normalizeRows = (rows = []) =>
  rows.map((row) => ({
    id: String(row.id ?? ''),
    article_no: String(row.article_no ?? ''),
    name: String(row.name ?? ''),
    in_price: String(row.in_price ?? ''),
    price: String(row.price ?? ''),
    unit: String(row.unit ?? ''),
    in_stock: String(row.in_stock ?? ''),
    description: String(row.description ?? ''),
  }))

const sideMenu = [
  { label: 'Invoices', icon: 'doc' },
  { label: 'Customers', icon: 'user' },
  { label: 'My Business', icon: 'gear' },
  { label: 'Invoice Journal', icon: 'book' },
  { label: 'Price List', icon: 'tag' },
  { label: 'Multiple Invoicing', icon: 'sheet' },
  { label: 'Unpaid Invoices', icon: 'cross' },
  { label: 'Offer', icon: 'ticket' },
  { label: 'Inventory Control', icon: 'bag' },
  { label: 'Member Invoicing', icon: 'card' },
  { label: 'Import/Export', icon: 'cloud' },
  { label: 'Log out', icon: 'door' },
]

const iconColorMap = {
  doc: '#7CE7DF',
  user: '#5FECC4',
  gear: '#90DFFB',
  book: '#71D3F4',
  tag: '#F5B444',
  sheet: '#89DBD0',
  cross: '#F168A6',
  ticket: '#E9DD5A',
  bag: '#9DE9E0',
  card: '#5AB5F8',
  cloud: '#8AB4FF',
  door: '#C0EDE9',
}

const MenuIcon = ({ type }) => {
  const color = iconColorMap[type] ?? '#7CE7DF'
  if (type === 'user') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="8" r="4" fill={color} />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" fill={color} />
      </svg>
    )
  }
  if (type === 'gear') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" fill="none" stroke={color} strokeWidth="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'tag') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 11V5h6l10 10-6 6L3 11z" fill={color} />
        <circle cx="8.5" cy="8.5" r="1.5" fill="#fff" />
      </svg>
    )
  }
  if (type === 'cross') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill={color} />
        <path d="M9 9l6 6M15 9l-6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'ticket') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 8h16v8H4a2 2 0 0 1 0-4 2 2 0 0 1 0-4z" fill="none" stroke={color} strokeWidth="2" />
        <path d="M10 8v8M14 8v8" stroke={color} strokeWidth="2" />
      </svg>
    )
  }
  if (type === 'cloud') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 18h10a4 4 0 1 0-1-7.9A5.5 5.5 0 0 0 5.4 12 3.5 3.5 0 0 0 7 18z" fill={color} />
      </svg>
    )
  }
  if (type === 'door') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 4h12v16H6z" fill="none" stroke={color} strokeWidth="2" />
        <circle cx="14" cy="12" r="1.2" fill={color} />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" fill={color} />
      <path d="M8 9h8M8 13h8M8 17h6" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    <path d="M15 15l6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

const AddIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="#38e39a" />
    <path d="M12 8v8M8 12h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const PrintIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="7" y="4.5" width="10" height="5.2" rx="1.1" fill="#46dce4" />
    <rect x="5" y="10" width="14" height="6.5" rx="1.4" fill="#46dce4" />
    <rect x="8" y="14" width="8" height="5.3" rx="1" fill="#46dce4" />
  </svg>
)

const ToggleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3.5" y="8.2" width="17" height="7.6" rx="4" fill="#46dce4" />
    <circle cx="16.5" cy="12" r="3.1" fill="#fff" />
  </svg>
)

const SortIcon = () => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M7 2v8" stroke="#66de95" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4.5 8.3L7 11l2.5-2.7" fill="none" stroke="#66de95" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

function PricelistPage() {
  const [rows, setRows] = useState(makeRows)
  const [searchArticle, setSearchArticle] = useState('')
  const [searchProduct, setSearchProduct] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let mounted = true

    const loadProducts = async () => {
      try {
        setIsLoading(true)
        setLoadError('')
        const data = await apiClient('/products')
        if (!mounted) return

        const parsed = normalizeRows(data?.products ?? [])
        setRows(parsed.length ? parsed : makeRows())
      } catch (error) {
        if (!mounted) return
        setRows(makeRows())
        setLoadError('Could not load products from backend. Showing demo data.')
      } finally {
        if (mounted) setIsLoading(false)
      }
    }

    loadProducts()
    return () => {
      mounted = false
    }
  }, [])

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const articleOk = row.article_no.toLowerCase().includes(searchArticle.toLowerCase())
      const productOk = row.name.toLowerCase().includes(searchProduct.toLowerCase())
      return articleOk && productOk
    })
  }, [rows, searchArticle, searchProduct])

  const handleChange = (id, field, value) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  return (
    <div className="price-page">
      <header className="price-topbar">
        <div className="topbar-left">
          <button type="button" className="menu-btn" aria-label="menu">
            <span />
            <span />
            <span />
          </button>
          <div className="profile desktop-only">
            <img src={MEDIA.diamond} alt="profile" />
            <div>
              <strong>John Andre</strong>
              <span>Storfjord AS</span>
            </div>
          </div>
        </div>
        <div className="topbar-right">
          <strong>English</strong>
          <img src={MEDIA.flags.en} alt="Language flag" />
        </div>
      </header>

      <div className="price-layout">
        <aside className="left-menu">
          <h3>Menu</h3>
          <ul>
            {sideMenu.map((item) => (
              <li key={item.label} className={item.label === 'Price List' ? 'active' : ''}>
                <span className="menu-icon">
                  <MenuIcon type={item.icon} />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <main className="price-main">
          <section className="price-controls">
            <div className="search-group">
              <div className="search-field">
                <input
                  value={searchArticle}
                  onChange={(event) => setSearchArticle(event.target.value)}
                  placeholder="Search Article No..."
                />
                <span className="search-icon">
                  <SearchIcon />
                </span>
              </div>
              <div className="search-field">
                <input
                  value={searchProduct}
                  onChange={(event) => setSearchProduct(event.target.value)}
                  placeholder="Search Product ..."
                />
                <span className="search-icon">
                  <SearchIcon />
                </span>
              </div>
            </div>

            <div className="action-group">
              <button type="button">
                <span className="action-label">New Product</span>{' '}
                <small>
                  <AddIcon />
                </small>
              </button>
              <button type="button">
                <span className="action-label">Print List</span>{' '}
                <small>
                  <PrintIcon />
                </small>
              </button>
              <button type="button">
                <span className="action-label">Advanced mode</span>{' '}
                <small>
                  <ToggleIcon />
                </small>
              </button>
            </div>
          </section>

          {isLoading && <div className="price-load-hint">Loading products...</div>}
          {loadError && <div className="price-load-error">{loadError}</div>}

          <section className="table-wrap">
            <div className="table-head">
              <span className="col-pointer" />
              <span className="col-article">
                Article No.{' '}
                <i>
                  <SortIcon />
                </i>
              </span>
              <span className="col-name">
                Product/Service{' '}
                <i>
                  <SortIcon />
                </i>
              </span>
              <span className="col-inprice">In Price</span>
              <span className="col-price">Price</span>
              <span className="col-unit">Unit</span>
              <span className="col-stock">In Stock</span>
              <span className="col-description">Description</span>
              <span className="col-more" />
            </div>

            <div className="table-body">
              {filteredRows.map((row, index) => (
                <div className="table-row" key={row.id}>
                  <span className="col-pointer">{index === 0 ? '->' : ''}</span>
                  <input
                    className="cell col-article"
                    value={row.article_no}
                    onChange={(event) => handleChange(row.id, 'article_no', event.target.value)}
                  />
                  <input
                    className="cell col-name"
                    value={row.name}
                    onChange={(event) => handleChange(row.id, 'name', event.target.value)}
                  />
                  <input
                    className="cell col-inprice"
                    value={row.in_price}
                    onChange={(event) => handleChange(row.id, 'in_price', event.target.value)}
                  />
                  <input
                    className="cell col-price"
                    value={row.price}
                    onChange={(event) => handleChange(row.id, 'price', event.target.value)}
                  />
                  <input
                    className="cell col-unit"
                    value={row.unit}
                    onChange={(event) => handleChange(row.id, 'unit', event.target.value)}
                  />
                  <input
                    className="cell col-stock"
                    value={row.in_stock}
                    onChange={(event) => handleChange(row.id, 'in_stock', event.target.value)}
                  />
                  <input
                    className="cell col-description"
                    value={row.description}
                    onChange={(event) => handleChange(row.id, 'description', event.target.value)}
                  />
                  <button type="button" className="more-btn col-more">
                    ...
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default PricelistPage
