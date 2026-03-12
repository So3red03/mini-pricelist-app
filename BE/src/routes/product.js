import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { query } from '../db/index.js'

const productRouter = Router()

productRouter.get('/products', authMiddleware, async (_req, res) => {
  try {
    const { rows } = await query(
      'select id, article_no, name, in_price, price, unit, in_stock, description from products order by article_no asc, id asc',
    )
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    res.set('Pragma', 'no-cache')
    res.set('Expires', '0')
    res.json({ products: rows })
  } catch (error) {
    console.error('Products fetch failed', error)
    res.status(500).json({ message: 'Could not load products' })
  }
})

productRouter.put('/products/:id', authMiddleware, async (req, res) => {
  const { id } = req.params
  const { article_no, name, in_price, price, unit, in_stock, description } = req.body ?? {}

  if (!article_no || !name || !unit) {
    return res.status(400).json({ message: 'article_no, name and unit are required' })
  }

  const parsedInPrice = Number(in_price)
  const parsedPrice = Number(price)
  const parsedInStock = Number(in_stock)

  if (!Number.isFinite(parsedInPrice) || !Number.isFinite(parsedPrice) || !Number.isInteger(parsedInStock)) {
    return res.status(400).json({ message: 'in_price, price and in_stock are invalid' })
  }

  try {
    const { rows } = await query(
      `update products
       set article_no = $1,
           name = $2,
           in_price = $3,
           price = $4,
           unit = $5,
           in_stock = $6,
           description = $7
       where id = $8
       returning id, article_no, name, in_price, price, unit, in_stock, description`,
      [article_no, name, parsedInPrice, parsedPrice, unit, parsedInStock, description ?? null, id],
    )

    if (!rows.length) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ product: rows[0] })
  } catch (error) {
    console.error('Product update failed', error)
    res.status(500).json({ message: 'Could not update product' })
  }
})

export { productRouter }

