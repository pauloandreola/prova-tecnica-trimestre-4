import 'reflect-metadata'
import { JsonWebTokenError, sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UsersRepositoryInMemory } from '../../../../modules/repositories/user/in-memory/UsersRepositoryInMemory'
import { LoginUserUseCase } from '../loginUser/LoginUserUseCase'
import { RefreshTokenUserUseCase } from './RefreshTokenUserUseCase'

dotenv.config()

const tokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESHTOKEN

const expireToken = '5m'
const expireRefreshToken = '30d'

let usersRepositoryInMemory: UsersRepositoryInMemory
let loginUserUseCase: LoginUserUseCase
let refreshTokenUserUseCase: RefreshTokenUserUseCase

describe('RefreshTokenUseCase', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory)
    refreshTokenUserUseCase = new RefreshTokenUserUseCase(usersRepositoryInMemory)
  })

  it('should be create a refresh token', async () => {
    const { _id: userId, email: userEmail } = await loginUserUseCase.execute('paulo01@gmail.com', '1234')

    const token = sign({ userId, userEmail }, tokenSecret, { expiresIn: expireToken })
    const newToken = token

    const refreshToken = sign({ userId, userEmail }, refreshTokenSecret, { expiresIn: expireRefreshToken })
    const newRefreshToken = refreshToken

    expect(newToken).toEqual(token)
    expect(newRefreshToken).toEqual(refreshToken)
  })

  it('should not be create a refresh token', async () => {
    await expect(refreshTokenUserUseCase.execute('teste')).rejects.toBeInstanceOf(JsonWebTokenError)
  })
})
