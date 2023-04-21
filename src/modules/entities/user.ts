export class User {
  _id!: string
  name: string
  email: string
  password: string
  refreshToken?: string

  constructor (_id: string, name: string, email: string, password: string, refreshToken: string) {
    this._id = _id
    this.name = name
    this.email = email
    this.password = password
    this.refreshToken = refreshToken
  }
}
