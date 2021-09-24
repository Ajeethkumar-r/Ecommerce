//this piece of authMiddleware validates the token from if the token matches we decoded the token and send the JWT_secret to the user { protect } is then passed to the userRoutes
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET) //the JWT.verify() filters and automatically check whether ther signed jwt token is hashed based on HMAC(Hash Based Message Authentication) or asymmetric key then proceed the below function which we specify
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized , no token')
  }
})

const admin =  (req, res,next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as as Admin')
  }
}

export { protect, admin }
