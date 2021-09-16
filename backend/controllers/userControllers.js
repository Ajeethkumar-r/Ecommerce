//userControllers decide the do's and dont's for the userRoutes(this points only the routing ) all other actions are determined by the controllers

import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

//@desc auth user and get token
//@route POST/api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }) //findOne method is used to get a document from the mongodb if the condition db rules for the document matches ,here it is used to get the email from the db  addtionally findOne provides the first argument if no.of arguments are are given to the method

  if (user && (await user.matchPassword(password))) {
    //here we check both email and password of the user the await promise is taken from tge usermodel there we put validation for the password which checks the password the user entered as a plain text if that matches with the password in our db data then the below info will be provided
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id), // token generate for each user which carries the _id of user too
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const existUser = await User.findOne({ email })

  if (existUser) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error(' Invalid User data ')
  }
})

const getUserProfile = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data
  const user = await User.findById(req.user._id) //this is the id we get from the decoded id by using req.user

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const updateUserProfile = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data
  const user = await User.findById(req.user._id) //this is the id we get from the decoded id by using req.user

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id), // token generate for each user which carries the _id of user too
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

const deleteUser = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data
  const user = await User.findById(req.params.id) //this is the id we get from the decoded id by using req.user

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const getUserById = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data
  const user = await User.findById(req.params.id).select('-password') //this is the id we get from the decoded id by using req.user

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

const updateUser = asyncHandler(async (req, res) => {
  //this should give the user profile if the token in authMiddleware matches  ::> then getUserProfile pases to the userRoutes with it's data
  const user = await User.findById(req.params.id) //this is the id we get from the decoded id by using req.user

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User Not Found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
