import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListTaskByIdUseCase } from './ListTaskByIdUseCase'

export class ListTaskByIdController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId, taskId } = req.body
    try {
      const listTaskByIdUseCase = container.resolve(ListTaskByIdUseCase)
      const tasks = await listTaskByIdUseCase.execute(taskId, userId)

      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
