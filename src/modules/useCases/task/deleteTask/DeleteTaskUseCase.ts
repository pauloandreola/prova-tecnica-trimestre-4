import { inject, injectable } from 'tsyringe'
import { ObjectId } from 'mongodb'

import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class DeleteTaskUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (taskId: string): Promise<any> {
    const testTaskId = ObjectId.isValid(taskId)
    if (!testTaskId) {
      throw new Error('Invalid taskId')
    }

    const findTask = await this.tasksRepository.findTaskById(taskId)
    if (!findTask) {
      throw new Error('Task not founded!')
    }

    await this.tasksRepository.deleteTaskById(taskId)
  }
}
