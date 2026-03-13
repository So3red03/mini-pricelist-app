import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

const signAccessToken = (payload, overrides = {}) =>
  jwt.sign(payload, env.jwtSecret, { expiresIn: '2h', ...overrides })

const verifyAccessToken = (token) => jwt.verify(token, env.jwtSecret)

export { signAccessToken, verifyAccessToken }

