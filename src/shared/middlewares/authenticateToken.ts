import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { connectMongoDB } from '../database/connection'

dotenv.config()

const refreshSecret = process.env.REFRESHTOKEN

export async function authenticateToken (req: Request, res: Response, next: NextFunction) {
  const authenticateToken = req.headers.authorization
  if (!authenticateToken) {
    return res.status(400).json('Token not found!')
  }

  const refreshToken = authenticateToken?.split(' ')[1]
  if (!refreshToken) {
    return res.status(404).json('Token not found!')
  }

  try {
    const data = verify(refreshToken, refreshSecret) as { userId: string}
    const verifyUser = data.userId
    const database = await connectMongoDB()
    const user = database.collection('tasks').findOne({ verifyUser })
    if (!user) {
      return res.status(401).json('Invalid user!')
    }
  } catch (error) {
    return res.status(401).json('Invalid token')
  }

  return next()
}
