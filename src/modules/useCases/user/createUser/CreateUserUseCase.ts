import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'

import { IUserRepository } from '../../../repositories/users/IUserRepository'

@injectable()
export class CreateUserUseCase {
  constructor (@inject('UserRepository')private userRepository: IUserRepository
  ) {}

  async execute (name: string, email: string, password: string, confirmPassword: string): Promise<void> {
    const userVerificationExist = await this.userRepository.findUserByEmail(email)
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
    if (userVerificationExist) {
      throw new Error('User Already Exists!')
    }

    const passwordHash = await hash(password, 8)
    this.userRepository.createUser(name, email, passwordHash)
  }
}
