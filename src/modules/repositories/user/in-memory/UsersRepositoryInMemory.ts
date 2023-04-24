import { User } from '../../../entities/User'
import { IUsersRepository } from '../../user/IUsersRepository'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  private id = 1

  async createUser (name: string, email: string, password: string): Promise<void> {
    const user: User = {
      name,
      email,
      password,
      _id: '',
      refreshToken: []
    }
    this.users.push(user)
  }

  async findUserById (userId: string): Promise<User> {
    const user = this.users.find(user => user._id === userId)
    return user
  }

  async findUserByEmail (email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async updateRefreshToken (userId: string, refreshToken: string): Promise<void> {
    const index = this.users.findIndex(user => user._id === userId)
    if (index === -1) {
      throw new Error(`User with id ${userId} not found`)
    }

    Object.assign(this.users[index].refreshToken, [refreshToken])
  }
}
