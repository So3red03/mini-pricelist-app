import { useMemo, useState } from 'react'
import './pricelist.css'
import { MEDIA } from '../constants/index'

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

const sideMenu = [
  'Invoices',
  'Customers',
  'My Business',
  'Invoice Journal',
  'Price List',
  'Multiple Invoicing',
  'Unpaid Invoices',
  'Offer',
  'Inventory Control',
  'Member Invoicing',
  'Import/Export',
  'Log out',
]

function PricelistPage() {
  const [rows, setRows] = useState(makeRows)
  const [searchArticle, setSearchArticle] = useState('')
  const [searchProduct, setSearchProduct] = useState('')

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
            |||
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
          <img src={MEDIA.flags.en} alt="English flag" />
        </div>
      </header>

      <div className="price-layout">
        <aside className="left-menu">
          <h3>Menu</h3>
          <ul>
            {sideMenu.map((item) => (
              <li key={item} className={item === 'Price List' ? 'active' : ''}>
                {item}
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
                  placeholder="Search Article No ..."
                />
                <span>Q</span>
              </div>
              <div className="search-field">
                <input
                  value={searchProduct}
                  onChange={(event) => setSearchProduct(event.target.value)}
                  placeholder="Search Product ..."
                />
                <span>Q</span>
              </div>
            </div>

            <div className="action-group">
              <button type="button">New Product (+)</button>
              <button type="button">Print List [print]</button>
              <button type="button">Advanced mode on</button>
            </div>
          </section>

          <section className="table-wrap">
            <div className="table-head">
              <span className="col-pointer" />
              <span className="col-article">Article No.</span>
              <span className="col-name">Product/Service</span>
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
                  <span className="col-pointer">{index === 2 ? '->' : ''}</span>
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
