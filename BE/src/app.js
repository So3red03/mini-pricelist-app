import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { env } from './config/env.js'
import { apiRouter } from './routes/index.js'

const app = express()

const allowedOrigins = String(env.corsOrigin)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const wildcardOriginRules = [
  /^https:\/\/[a-z0-9-]+\.onrender\.com$/i,
  /^http:\/\/(localhost|127\.0\.0\.1):\d+$/i,
]

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true)
      return
    }

    const isAllowedByEnv = allowedOrigins.includes(origin)
    const isAllowedByRule = wildcardOriginRules.some((rule) => rule.test(origin))

    if (isAllowedByEnv || isAllowedByRule) {
      callback(null, true)
      return
    }

    callback(new Error(`CORS blocked origin: ${origin}`))
  },
  credentials: true,
}

app.use(cors(corsOptions))

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))

app.use('/api', apiRouter)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export { app }

