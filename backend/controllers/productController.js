import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10

  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword, //regex is for instead of typing full name of product we can type some letters of product and search
          $options: 'i', //caseInsensitive : 'i'
        },
      }
    : {}

  const count = await Product.countDocuments({ ...keyword }) //get us products from mongodb
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1)) //this mongodb method skip the result which is inside the bracket , finally we will get the no.of products for each page as the pagesize we defiened
  res.json({ products, page, pages: Math.ceil(count / pageSize) }) //these all object are passed now
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

const createProduct = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data
  const product = new Product({
    name: 'sample name',
    user: req.user._id,
    description: 'sample description',
    image: '/images/sample.jpg',
    price: 0,
    numReviews: 0,
    category: 'sample category',
    brand: 'sample brand',
    countInStock: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data

  const { name, price, description, image, category, brand, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name // name= req.body   it is from the body
    product.price = price
    product.description = description
    product.image = image
    product.category = category
    product.brand = brand
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const updateProductReview = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data

  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ maesage: 'Product reviewed successfully' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)
  res.json(products)
})

export {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductReview,
  getTopProducts,
} //export these to productRoutes
