import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { IUsersRepository } from '../../../repositories/user/IUsersRepository'
import * as dotenv from 'dotenv'

dotenv.config()

const tokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESHTOKEN

const expireToken = '2m'
const expireRefreshToken = '5m'

interface ITokenData {
  email: string;
  userId: string;
}

interface IRefreshToken {
  userId: string;
  isNewToken: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute (token: string): Promise<IRefreshToken> {
    const { email, userId } = verify(token, tokenSecret) as ITokenData
    const isUserId = userId

    const user = await this.usersRepository.findUserByEmail(email)

    if (!user) {
      throw new Error('Invalid refresh Token!')
    }

    const newToken = sign({ userId: user._id, email: user.email }, tokenSecret, { expiresIn: expireToken })

    const newRefreshToken = sign({ userId: user._id, email: user.email }, refreshTokenSecret, { expiresIn: expireRefreshToken })

    await this.usersRepository.updateRefreshToken(userId, newRefreshToken, new Date())

    const { refreshToken } = await this.usersRepository.findUserByEmail(email)

    return { userId: user._id, isNewToken: newToken }
  }
}
