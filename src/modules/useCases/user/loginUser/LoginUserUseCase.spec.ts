import 'reflect-metadata'

import { UsersRepositoryInMemory } from '../../../../modules/repositories/user/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { LoginUserUseCase } from './LoginUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let loginUserUseCase: LoginUserUseCase

describe('Login a user', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
    loginUserUseCase = new LoginUserUseCase(usersRepositoryInMemory)
  })

  it('should login an user', async () => {
    await createUserUseCase.execute('Paulo01', 'paulo01@gmail.com', '1234', '1234')

    const login = await loginUserUseCase.execute('paulo01@gmail.com', '1234')

    expect(login).toHaveProperty('email')
    expect(login).toHaveProperty('password')
  })

  it('should not login user with wrong email', async () => {
    await expect(loginUserUseCase.execute('joao@gnail.com', '1234')
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not login user with wrong password', async () => {
    await expect(loginUserUseCase.execute('paulo01@gmail.com', '12345')
    ).rejects.toBeInstanceOf(Error)
  })
})
