import { inject, injectable } from 'tsyringe'
import { ObjectId } from 'mongodb'

import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class DeleteTaskUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (taskId: string, userId: string): Promise<any> {
    const findTask = await this.tasksRepository.findTaskById(taskId)
    if (!findTask) {
      throw new Error('Task not found!')
    }

    await this.tasksRepository.deleteTaskById(taskId)
  }
}
