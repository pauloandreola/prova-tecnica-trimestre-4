import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { LoginUserUseCase } from './LoginUserUseCase'

export class LoginUserController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body
    try {
      const loginUserUseCase = container.resolve(LoginUserUseCase)
      const user = await loginUserUseCase.execute(email, password)

      return res.status(201).json(user)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
}
