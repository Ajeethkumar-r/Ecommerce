import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFounud, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js' //get the productRoutes file to make routes work flowly in our server.js
import userRoutes from './routes/userRoutes.js' //get the userRoutes file to make routes work flowly in our server.js
import orderRoutes from './routes/orderRoutes.js'
dotenv.config() //to use the env variables we need to call it's config here

connectDB() //need to call "connectDB"

const app = express()

app.use(express.json()) // make our server to accept the json format data that is send from the POSTMAN app for both developing and testing  (piece of middleware)

app.get('/', (req, res) => {
  res.send('API is running in port 5000...')
})

app.use('/api/products', productRoutes) // make path for our productRoutes to get the access
app.use('/api/users', userRoutes) // make path for our userRoutes to get the access
app.use('/api/orders', orderRoutes)

app.use(notFounud)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `sever running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)
