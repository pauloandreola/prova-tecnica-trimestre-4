import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { UpdateTaskUseCase } from './UpdateTaskUseCase'

export class UpdatedTaskController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { taskId, title, description, done } = req.body
    try {
      const updateTaskUseCase = container.resolve(UpdateTaskUseCase)
      await updateTaskUseCase.execute(taskId, title, description, done)

      return res.status(200).json('Task updated!')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
