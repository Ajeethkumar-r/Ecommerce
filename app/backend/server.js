import path from 'path'
import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import colors from 'colors'
import { notFounud, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import userRoutes from '../backend/routes/userRoutes.js' //get the userRoutes file to make routes work flowly in our server.js
import orderRoutes from '../backend/routes/orderRoutes.js'
import uploadRoutes from '../backend/routes/uploadRoutes.js'
import productRoutes from '../backend/routes/productRoutes.js' //get the productRoutes file to make routes work flowly in our server.js

dotenv.config() //to use the env variables we need to call it's config here

connectDB() //need to call "connectDB"

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json()) // make our server to accept the json format data that is send from the POSTMAN app for both developing and testing  (piece of middleware)

app.use('/api/products', productRoutes) // make path for our productRoutes to get the access
app.use('/api/users', userRoutes) // make path for our userRoutes to get the access
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// paypal route for clientId
app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) // make our uploads folder in the root as static(which directly loads in our browser)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running in port 5000')
  })
}

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
