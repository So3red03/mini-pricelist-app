import { Router } from 'express'
import { authMiddleware } from '../middleware/auth.js'
import { signAccessToken } from '../utils/jwt.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'be', timestamp: new Date().toISOString() })
})

router.post('/auth/mock-login', (req, res) => {
  const { userId = 'demo-user', role = 'admin' } = req.body ?? {}
  const token = signAccessToken({ sub: userId, role })
  res.json({ token })
})

router.get('/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user })
})

export { router as apiRouter }
