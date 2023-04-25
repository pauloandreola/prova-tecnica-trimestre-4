import 'reflect-metadata'

import { CreateUserUseCase } from './CreateUserUseCase'
import { UsersRepositoryInMemory } from '../../../../modules/repositories/user/in-memory/UsersRepositoryInMemory'

let createUserUseCase: CreateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory

describe('Create an User', () => {
  beforeAll(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to create a new user', async () => {
    await createUserUseCase.execute('Paulo01', 'paulo01@gmail.com', '1234', '1234')

    const user = await usersRepositoryInMemory.findUserByEmail('paulo01@gmail.com')

    expect(user.name).toBe('Paulo01')
    expect(user.email).toBe('paulo01@gmail.com')
  })

  it('should not be able to create new user without name', async () => {
    await expect(createUserUseCase.execute('', 'paulo01@gmail.com', '1234', '1234')
    ).rejects.toEqual(new Error('Please check the name field blank!'))
  })

  it('should not be able to create new user without email', async () => {
    await expect(createUserUseCase.execute('Paulo02', '', '1234', '1234')
    ).rejects.toEqual(new Error('Please check the e-mail field blank!'))
  })

  it('should not be able to create new user without password', async () => {
    await expect(createUserUseCase.execute('Paulo02', 'paulo01@gmail.com', '', '1234')
    ).rejects.toEqual(new Error('Please check the password field blank!'))
  })

  it('should not be able to create new user with not the same password and confirm password', async () => {
    await expect(createUserUseCase.execute('Paulo02', 'paulo01@gmail.com', '12345', '1234')
    ).rejects.toEqual(new Error('Password is not the same!'))
  })

  it('should not be able to create new user with same email', async () => {
    await expect(createUserUseCase.execute('Paulo02', 'paulo01@gmail.com', '1234', '1234')
    ).rejects.toEqual(new Error('User already exists!'))
  })
})
