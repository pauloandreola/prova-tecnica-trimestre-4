import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateTaskUseCase } from './CreateTaskUseCase'

export class CreateTaskController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId, title, description, done } = req.body
    try {
      const createTaskUseCase = container.resolve(CreateTaskUseCase)
      await createTaskUseCase.execute(userId, title, description, done)

      return res.status(201).json('Task created')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
