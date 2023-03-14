import express from 'express'
import cors from 'cors'

import db from './config/connection.js'
import routes from './routes/index.js'

const PORT = process.env.port || 3001
const app = express()

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(routes)

db.once('open', () => {
  app.listen(process.env.PORT || PORT, () => {
    console.log(`API server  running on port ${PORT}!`)
  })
})
