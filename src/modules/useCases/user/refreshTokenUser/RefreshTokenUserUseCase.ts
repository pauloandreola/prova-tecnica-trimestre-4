import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import * as dotenv from 'dotenv'

import { IUsersRepository } from '../../../repositories/user/IUsersRepository'

dotenv.config()

const tokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESHTOKEN

const expireToken = '5m'
const expireRefreshToken = '30d'

interface ITokenData {
  email: string;
  userId: string;
}

interface IRefreshToken {
  userId: string;
  isNewToken: string;
}

@injectable()
export class RefreshTokenUserUseCase {
  constructor (@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute (token: string): Promise<IRefreshToken> {
    const { email, userId } = verify(token, tokenSecret) as ITokenData

    const user = await this.usersRepository.findUserByEmail(email)
    if (!user) {
      throw new Error('Invalid refresh Token!')
    }

    const newToken = sign({ userId: user._id, email: user.email }, tokenSecret, { expiresIn: expireToken })

    const newRefreshToken = sign({ userId: user._id, email: user.email }, refreshTokenSecret, { expiresIn: expireRefreshToken })

    await this.usersRepository.updateRefreshToken(userId, newRefreshToken, new Date())

    return { userId: user._id, isNewToken: newToken }
  }
}
