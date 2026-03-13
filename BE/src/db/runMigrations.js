import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { pool } from './index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const readSql = async (filename) => {
  const filePath = path.join(__dirname, filename)
  return fs.readFile(filePath, 'utf-8')
}

const runMigrations = async () => {
  const schemaSql = await readSql('schema.sql')
  const seedSql = await readSql('seed.sql')

  console.log('Applying schema...')
  await pool.query(schemaSql)

  console.log('Resetting seed tables...')
  await pool.query('truncate table translations, products, users restart identity cascade')

  console.log('Seeding data...')
  await pool.query(seedSql)
}

runMigrations()
  .then(() => {
    console.log('Database ready.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Database setup failed', error)
    process.exit(1)
  })
