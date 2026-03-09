import { Router } from 'express'
import { query } from '../db/index.js'
import { loginRouter } from './login.js'
import { productRouter } from './product.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'be', timestamp: new Date().toISOString() })
})

router.get('/translations', async (_req, res) => {
  try {
    const { rows } = await query('select key, en, sv from translations order by key asc')
    res.json({ translations: rows })
  } catch (error) {
    console.error('Translations fetch failed', error)
    res.status(500).json({ message: 'Could not load translations' })
  }
})

router.use(loginRouter)
router.use(productRouter)

export { router as apiRouter }
