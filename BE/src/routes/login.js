import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { authMiddleware } from '../middleware/auth.js'
import { signAccessToken } from '../utils/jwt.js'
import { query } from '../db/index.js'
import { env } from '../config/env.js'

const loginRouter = Router()

loginRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body ?? {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' })
  }

  try {
    const normalizedEmail = String(email).toLowerCase()
    const { rows } = await query(
      'select id, email, password_hash from users where email = $1 limit 1',
      [normalizedEmail],
    )

    if (!rows.length) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const user = rows[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = signAccessToken({ sub: user.id, email: user.email })

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
      secure: env.nodeEnv === 'production',
      maxAge: 1000 * 60 * 60 * 2,
    })

    res.json({ token, user: { id: user.id, email: user.email } })
  } catch (error) {
    console.error('Login error', error)
    res.status(500).json({ message: 'Unable to login right now' })
  }
})

loginRouter.get('/auth/me', authMiddleware, (req, res) => {
  res.json({ user: req.user })
})

export { loginRouter }


