import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
const routes = express()
import Product from '../models/productModel.js'

//this route is to get the products from our db
//GET/api/products
//access:public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    //asyncHandler is used to handle the exceptions we use it here insteadof {try and catch block}
    const products = await Product.find({})
    res.json(products)
  })
)

//this route is to get the single product from our db using its 'ID'
//GET/api/product
//access:public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id) //get the product from db by using 'findById' method
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'product not found' }) //give 404 product not found if the product is not found in our db
    }
  })
)

export default routes
