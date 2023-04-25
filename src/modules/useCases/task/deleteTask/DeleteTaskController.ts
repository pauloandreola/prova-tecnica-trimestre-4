import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { DeleteTaskUseCase } from './DeleteTaskUseCase'

export class DeleteTaskController {
  async handle (req: Request, res: Response): Promise<Response> {
    const taskId = req.params.id
    const userId = req.body
    try {
      const deleteTaskUseCase = container.resolve(DeleteTaskUseCase)
      await deleteTaskUseCase.execute(taskId, userId)

      return res.status(200).json('Task Deleted')
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
