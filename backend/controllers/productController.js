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

const deleteProduct = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data
  const product = await Product.findById(req.params.id) //this is the id we get from the decoded id by using req.product

  if (product) {
    await product.remove()
    res.json({ message: 'product removed' })
  } else {
    res.status(404)
    throw new Error('product Not Found')
  }
})

export { getProducts, getProductByID, deleteProduct } //export these to productRoutes
