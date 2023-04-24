import { RefreshArray } from '../repositories/user/UsersRepository'

export class User {
  _id!: string
  name: string
  email: string
  password: string
  refreshToken: RefreshArray[]

  constructor (_id: string, name: string, email: string, password: string, refreshToken: RefreshArray[]) {
    this._id = _id
    this.name = name
    this.email = email
    this.password = password
    this.refreshToken = refreshToken
  }
}
