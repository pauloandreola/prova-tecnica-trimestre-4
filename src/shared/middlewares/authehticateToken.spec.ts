import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express'
import { authenticateToken } from './authenticateToken'
import { UsersRepositoryInMemory } from '../../modules/repositories/user/in-memory/UsersRepositoryInMemory'
import { CreateUserUseCase } from '../../modules/useCases/user/createUser/CreateUserUseCase'

jest.mock(
  'jsonwebtoken',
  () => {
    return {
      verify: jest.fn().mockImplementation(() => {
        return {
          email: 'paulo01@gmail.com',
          sub: '01'
        }
      })
    }
  },
  { virtual: true }
)

jest.mock('../../modules/repositories/user/UsersRepository', () => {
  return {
    UsersRepository: jest.fn().mockImplementation(() => {
      return {
        findUserByEmail: jest.fn().mockImplementation(() => {
          return {
            id: '01',
            name: 'Paulo01',
            email: 'paulo01@gmail.com'
          }
        })
      }
    })
  }
})

let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate token', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be able to authenticate an user', async () => {
    const req = { headers: { authorization: 'Bearer token' }, user: { userId: '01', email: 'paulo01@gmail.com' } } as Request
    const res = {} as Response
    const next = jest.fn() as NextFunction

    await authenticateToken(req, res, next)

    expect(req.user).toEqual({ userId: '01', email: 'paulo01@gmail.com' })
  })

  it('Not be possible to authenticate an user who did not send the token', async () => {
    await createUserUseCase.execute('Paulo02', 'paulo02@gmail.com', '1234', '1234')

    const req = { headers: { authorization: null }, user: {} } as Request
    const res = {} as Response
    const next = jest.fn() as NextFunction

    try {
      await authenticateToken(req, res, next)
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
    }
  })

  it('It must not be possible to authenticate a user who sent an invalid token', async () => {
    jest.mock('../../modules/repositories/user/UsersRepository', () => {
      return {
        UserRepository: jest.fn().mockImplementation(() => {
          return {
            findUserByEmail: jest.fn().mockImplementation(() => {
              return null
            })
          }
        })
      }
    }
    )

    await createUserUseCase.execute('Paulo02', 'paulo02@gmail.com', '1234', '1234')

    const req = { headers: { authorization: 'Bearer token' }, user: {} } as Request
    const res = {} as Response
    const next = jest.fn() as NextFunction

    await authenticateToken(req, res, next)

    const result = await authenticateToken(req, res, next)

    expect(result).toBeUndefined()
    expect(next).toHaveBeenCalled()
  })
})
