import 'reflect-metadata'
import { JsonWebTokenError, sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'

import { UsersRepositoryInMemory } from '../../../../modules/repositories/user/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { LoginUserUseCase } from '../loginUser/LoginUserUseCase'
import { RefreshTokenUserUseCase } from './RefreshTokenUserUseCase'

dotenv.config()

const tokenSecret = process.env.TOKEN
const refreshTokenSecret = process.env.REFRESHTOKEN

const expireToken = '5m'
const expireRefreshToken = '30d'

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let loginUserUseCase: LoginUserUseCase
let refreshTokenUserUseCase: RefreshTokenUserUseCase

describe('RefreshTokenUseCase', () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory)
    refreshTokenUserUseCase = new RefreshTokenUserUseCase(usersRepositoryInMemory)
  })

  it('should be create a refresh token', async () => {
    await createUserUseCase.execute('Paulo01', 'paulo01@gmail.com', '1234', '1234')

    const { _id, email } = await loginUserUseCase.execute('paulo01@gmail.com', '1234')

    const token = sign({ userId: _id, userEmail: email }, tokenSecret, { expiresIn: expireToken })
    const newToken = token

    const refreshToken = sign({ userId: _id, userEmail: email }, refreshTokenSecret, { expiresIn: expireRefreshToken })
    const newRefreshToken = refreshToken

    expect(newToken).toEqual(token)
    expect(newRefreshToken).toEqual(refreshToken)
  })

  it('should not be create a refresh token', async () => {
    await expect(refreshTokenUserUseCase.execute('teste')).rejects.toBeInstanceOf(JsonWebTokenError)
  })
})
