import pg from 'pg'
import { env } from '../config/env.js'

const { Pool } = pg

const pool = new Pool({
  connectionString: env.databaseUrl,
})

const query = (text, params) => pool.query(text, params)

export { pool, query }
