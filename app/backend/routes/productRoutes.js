import express from 'express'

const router = express.Router()
import {
  getProducts,
  getProductByID,
  deleteProduct,
  createProduct,
  updateProduct,
  updateProductReview,
  getTopProducts,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, updateProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductByID)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
