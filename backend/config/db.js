import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    //remember to use try catch
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      //   useCreateIndex: true,  <-- To avoid warnings in console dont use
    })
    console.log(`Mongoose connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error: ${error.message}`) //to know the errors should use 'error.message'
    process.exit(1) //to exit the process '1' for false '0' for true
  }
}

export default connectDB
