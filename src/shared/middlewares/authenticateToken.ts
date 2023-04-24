import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { connectMongoDB } from '../database/connection'

dotenv.config()

const secret = process.env.TOKEN

export async function authenticateToken (req: Request, res: Response, next: NextFunction) {
  const authenticateToken = req.headers.authorization
  const token = authenticateToken?.split(' ')[1]
  if (!token) {
    return res.status(404).json('Token not found!')
  }

  try {
    const database = await connectMongoDB()
    const data = verify(token, secret) as { email: string}
    const user = await database.collection('tasks').findOne({ data })
    if (!user) {
      return res.status(401).json('Invalid user!')
    }
  } catch (error) {
    return res.status(401).json('Invalid token')
  }

  return next()
}
