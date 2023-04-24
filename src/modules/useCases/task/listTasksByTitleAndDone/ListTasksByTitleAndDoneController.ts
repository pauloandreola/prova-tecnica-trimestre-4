import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ListTasksByTitleAndDoneUseCase } from './ListTasksByTitleAndDoneUseCase'

export class ListTasksByTitleAndDoneController {
  async handle (req: Request, res: Response): Promise<Response> {
    const { userId, title, done } = req.body
    try {
      const listTasksByTitleAndDoneUseCase = container.resolve(ListTasksByTitleAndDoneUseCase)
      const tasks = await listTasksByTitleAndDoneUseCase.execute(userId, title, done)

      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
