import express, { Router } from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
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
      res.status(404)
      throw new Error('porduct NOT FOUND')
    } //give 404 product not found if the product id is in the same format but not matched to our real id in our db then give me 'product NOT FOUND'
  })
)

export default router
