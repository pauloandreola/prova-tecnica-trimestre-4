import { inject, injectable } from 'tsyringe'
import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import * as dotenv from 'dotenv'

import { IUsersRepository } from '../../../repositories/user/IUsersRepository'
import { RefreshArray } from '../../../repositories/user/UsersRepository'

dotenv.config()

const tokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESHTOKEN

const expireToken = '2m'
const expireRefreshToken = '5m'

interface IUserLogin {
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
  constructor (@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute (email: string, password: string): Promise<IUserLogin> {
    const user = await this.usersRepository.findUserByEmail(email)
    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, tokenSecret, { expiresIn: expireToken })

    const refreshToken = jwt.sign({ userId: user._id, email: user.email }, refreshTokenSecret, { expiresIn: expireRefreshToken })

    await this.usersRepository.updateRefreshToken(user._id, refreshToken, new Date())

    const refreshUser = await this.usersRepository.findUserByEmail(email)

    const userDataAndToken = {
      user: { email: refreshUser.email, password: refreshUser.password, newRefreshToken: refreshUser.refreshToken },
      token
    } as unknown as IUserLogin

    return userDataAndToken
  }
}
