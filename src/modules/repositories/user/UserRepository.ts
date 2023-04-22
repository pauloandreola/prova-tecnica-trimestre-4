import { FindOneAndUpdateOptions, ObjectId } from 'mongodb'
import { connectMongoDB } from '../../../shared/database/connection'
import { User } from '../../entities/User'
import { IUserRepository } from './IUserRepository'

export type RefreshArray = {
  refreshToken: string;
  createdAt: Date;
};

export class UserRepository implements IUserRepository {
  async findUserByEmail (email: string): Promise<User> {
    const database = await connectMongoDB()
    const user = await database.collection('users').findOne({ email })
    return user as unknown as User
  }

  async createUser (name: string, email: string, password: string): Promise<void> {
    const refreshToken: RefreshArray[] = []
    const database = await connectMongoDB()
    database.collection('users').insertOne({ name, email, password, refreshToken })
  }

  async updateRefreshToken (id: string, refreshToken: string, createdAt: Date): Promise<void> {
    const database = await connectMongoDB()

    const filter = { _id: new ObjectId(id) }
    const update = { $set: { refresh_token: [refreshToken, createdAt] } }
    const options = { returnOriginal: false } as FindOneAndUpdateOptions
    await database.collection('users').findOneAndUpdate(filter, update, options)
  }
}
