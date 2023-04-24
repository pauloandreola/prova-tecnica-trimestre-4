import { FindOneAndUpdateOptions, ObjectId } from 'mongodb'
import { connectMongoDB } from '../../../shared/database/connection'
import { User } from '../../entities/User'
import { IUsersRepository } from './IUsersRepository'

export type RefreshArray = {
  refreshToken: string;
  createdAt: Date;
};

export class UsersRepository implements IUsersRepository {
  async createUser (name: string, email: string, password: string): Promise<void> {
    const refreshToken: RefreshArray[] = []
    const database = await connectMongoDB()
    await database.collection('users').insertOne({ name, email, password, refreshToken })
  }

  async findUserByEmail (email: string): Promise<User> {
    const database = await connectMongoDB()
    const user = await database.collection('users').findOne({ email })
    return user as unknown as User
  }

  async findUserById (userId: string): Promise<User> {
    const database = await connectMongoDB()
    const user = await database.collection('users').findOne({ _id: new ObjectId(userId) })
    return user as unknown as User
  }

  async updateRefreshToken (userId: string, refreshToken: string): Promise<void> {
    const database = await connectMongoDB()
    const findUserId = { _id: new ObjectId(userId) }
    const newRefreshToken = { $set: { refresh_token: [refreshToken] } }
    const isDone = { returnOriginal: false } as FindOneAndUpdateOptions
    await database.collection('users').findOneAndUpdate(findUserId, newRefreshToken, isDone)
  }
}
