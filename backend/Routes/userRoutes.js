//userRoutes is only for routing purpose this helps to mention where the route pointed
import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userControllers.js'

router.post('/login', authUser) //we only do post method here, if we activate both endpoints instead of 'post' 'route' is preferable

export default router
