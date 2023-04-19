import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

export async function connectMongoDB () {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mn8tn9c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)

    console.log('MongoDB Altas connected!')
  } catch (err) {
    console.log('Not connected at MongoDB Atlas verify above =>', err)
  }
}
