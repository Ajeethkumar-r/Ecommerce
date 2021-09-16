//userRoutes is only for routing purpose this helps to mention where the route pointed
import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser) //we only do post method here, if we activate both endpoints instead of 'post' 'route' is preferable
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile) // protect is from authMiddleware here we pass the getUserProfile to protect
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)

export default router
