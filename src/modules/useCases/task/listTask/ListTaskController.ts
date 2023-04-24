import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListTaskUseCase } from './ListTaskUseCase'

export class ListTaskController {
  async handle (req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id
    try {
      const listTaskUseCase = container.resolve(ListTaskUseCase)
      const tasks = await listTaskUseCase.execute(taskId)

      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
