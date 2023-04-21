import { inject, injectable } from 'tsyringe'
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import * as dotenv from 'dotenv'

import { IUserRepository } from '../../../repositories/users/IUserRepository'
import { RefreshArray } from '../../../repositories/users/UserRepository'

dotenv.config()

const tokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESHTOKEN

const expireToken = '2m'
const expireRefreshToken = '5m'

interface IUserLoginResponse {
  user: {
    _id: string;
    email: string;
    name: string;
    password: string;
    refreshToken: RefreshArray[];
  };
  token: string;
}

@injectable()
export class LoginUserUseCase {
  constructor (@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute (email: string, password: string): Promise<IUserLoginResponse> {
    const user = await this.userRepository.findUserByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, tokenSecret, { subject: String(user._id), expiresIn: expireToken })

    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, refreshTokenSecret, { subject: String(user._id), expiresIn: expireRefreshToken })

    await this.userRepository.updateRefreshToken(user._id, refreshToken, new Date())

    const refreshUser = await this.userRepository.findUserByEmail(email)

    const userDataAndToken = {
      user: { email: refreshUser.email, password: refreshUser.password, newRefreshToken: refreshUser.refreshToken },
      token
    } as unknown as IUserLoginResponse

    return userDataAndToken
  }
}
