import dotenv from 'dotenv'

const envFile = process.env.ENV_FILE ?? '.env'
dotenv.config({ path: envFile })

const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 4000),
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET ?? 'dev-refresh-secret',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL ?? '',
}

export { env }
