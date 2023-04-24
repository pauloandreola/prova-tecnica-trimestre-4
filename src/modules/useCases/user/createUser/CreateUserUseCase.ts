import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import { IUsersRepository } from '../../../repositories/user/IUsersRepository'

@injectable()
export class CreateUserUseCase {
  constructor (@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute (name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    if (!name) {
      throw new Error('Please check the name field blank!')
    }
    if (!email) {
      throw new Error('Please check the e-mail field blank!')
    }
    if (!password) {
      throw new Error('Please check the password field blank!')
    }
    if (password !== confirmPassword) {
      throw new Error('Password is not the same!')
    }

    const userVerificationExist = await this.usersRepository.findUserByEmail(email)
    if (userVerificationExist) {
      throw new Error('User already exists!')
    }

    const passwordHash = await hash(password, 8)
    this.usersRepository.createUser(name, email, passwordHash)
  }
}
