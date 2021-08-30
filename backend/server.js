const express = require('express')
const products = require('./data/products')
const app = express()

app.get('/', (req, res) => {
  res.send('API is running in port 5000')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/product/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

app.listen(5000, console.log('API running in port 5000'))
