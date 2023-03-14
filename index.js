import express from 'express'
import cors from 'cors'

import db from './config/connection.js'
import routes from './routes/index.js'

const PORT = process.env.port || 3001
const { use, listen } = express()

use(cors())

use(express.urlencoded({ extended: true }))
use(express.json())
use(routes)

db.once('open', () => {
  listen(process.env.PORT || PORT, () => {
    console.log(`API server  running on port ${PORT}!`)
  })
})
