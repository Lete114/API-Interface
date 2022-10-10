import { createServer } from 'http'
import dotenv from 'dotenv'
import server from './serverless'

dotenv.config()

const PORT = process.env.PORT || 6870

createServer(server).listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Service is up and running port, http://127.0.0.1:' + PORT)
})
