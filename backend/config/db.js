import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // useCreateIndex: true,
    })
    console.log(`Mongodb connected: ${conn.connection.host}`.cyan.underline) //monogoDB connection statement if error occurs change the connection string once again
  } catch (error) {
    console.log(`ERROR: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB
