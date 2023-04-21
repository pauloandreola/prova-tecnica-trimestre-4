import { Db, MongoClient } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mn8tn9c.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

export async function connectMongoDB (): Promise<Db> {
  try {
    const client = new MongoClient(uri)
    await client.connect()

    console.log('MongoDB Atlas connected!')

    const database: Db = client.db(process.env.DB_NAME)
    return database
  } catch (err) {
    console.log('Not connected at MongoDB Atlas verify above =>', err)
  }
}
