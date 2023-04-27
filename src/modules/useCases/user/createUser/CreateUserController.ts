import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

export class CreateUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { name, email, password, confirmPassword } = req.body
    try {
      const createUserUseCase = container.resolve(CreateUserUseCase)
      const user = await createUserUseCase.execute(name, email, password, confirmPassword)

      return res.status(201).json('User created')
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}
