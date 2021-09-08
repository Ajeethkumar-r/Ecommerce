import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}) //get us products from mongodb
  res.json(products)
})

const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id) //get us single product from mongodb

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('PRODUCT NOT FOUND')
  }
})

export { getProducts, getProductByID } //export these to productRoutes
