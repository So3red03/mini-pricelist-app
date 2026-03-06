import { verifyAccessToken } from '../utils/jwt.js'

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : req.cookies?.access_token

  if (!bearerToken) {
    return res.status(401).json({ message: 'Missing authorization token' })
  }

  try {
    const decoded = verifyAccessToken(bearerToken)
    req.user = decoded
    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export { authMiddleware }
