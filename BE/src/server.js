import { app } from './app.js'
import { env } from './config/env.js'

const start = () => {
  try {
    app.listen(env.port, () => {
      console.log(`API ready on http://localhost:${env.port}`)
    })
  } catch (error) {
    console.error('Server failed to start', error)
    process.exit(1)
  }
}

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled promise rejection', reason)
})

start()
