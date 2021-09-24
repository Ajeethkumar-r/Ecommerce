import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import connectDB from './config/db.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    //to clean the previos data in mongoDB
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users) //get users.js in createdUsers

    const adminUser = createdUsers[0]._id
    const sampleProducts = products.map((product) => {
      //map through products.js and apend it with adminuser
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts) //to make 'objectid' in mongoose as 'adminuser'
    console.log('DATA IMPORTED!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error.message}`)
    process.exit(1)
  }
}

const destroytData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('DATA DESTROYED!'.blue.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroytData()
} else {
  importData()
}
