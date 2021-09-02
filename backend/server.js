import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productRoutes from './Routes/productRoutes.js'

dotenv.config()

connectDB() //need to call "connectDB"

const app = express()

app.get('/', (req, res) => {
  res.send('API is running in port 5000...')
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `sever running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)
