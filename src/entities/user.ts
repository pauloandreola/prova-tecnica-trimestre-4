import { Schema } from 'mongoose'
import { IUser } from '../dtos/IUserDTO'

export const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String }
})
