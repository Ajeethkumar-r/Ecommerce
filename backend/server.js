import express from 'express'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'

import productRoutes from './Routes/productRoutes.js' //get the productRoutes file to make routes wrok flowly in our server.js

dotenv.config()

connectDB() //need to call "connectDB"

const app = express()

app.get('/', (req, res) => {
  res.send('API is running in port 5000...')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `sever running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)
