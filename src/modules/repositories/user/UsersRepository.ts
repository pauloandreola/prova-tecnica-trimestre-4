import { FindOneAndUpdateOptions, ObjectId } from 'mongodb'
import { connectMongoDB } from '../../../shared/database/connection'
import { User } from '../../entities/user'
import { IUsersRepository } from './IUsersRepository'

export type RefreshArray = {
  refreshToken: string;
  createdAt: Date;
};

export class UsersRepository implements IUsersRepository {
  async createUser (name: string, email: string, password: string): Promise<User> {
    const refreshToken: RefreshArray[] = []
    const database = await connectMongoDB()
    const user = await database.collection('users').insertOne({ name, email, password, refreshToken })
    return user as unknown as User
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

  async updateRefreshToken (userId: string, refreshToken: string, createdAt: Date): Promise<void> {
    const database = await connectMongoDB()
    const findUserId = { _id: new ObjectId(userId) }
    const newRefreshToken = { $set: { refresh_token: [refreshToken], createdAt } }
    const isDone = { returnOriginal: false } as FindOneAndUpdateOptions
    await database.collection('users').findOneAndUpdate(findUserId, newRefreshToken, isDone)
  }
}
