import { Schema, model } from 'mongoose'
import { IUser } from '../dtos/IUserDTO'

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }
})

export const UserModel = model<IUser>('User', userSchema)
