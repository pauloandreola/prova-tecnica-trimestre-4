import { inject, injectable } from 'tsyringe'
import { ObjectId } from 'mongodb'

import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class UpdateTaskUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (taskId: string, title: string, description: string, done: boolean): Promise<void> {
    const testTaskId = ObjectId.isValid(taskId)
    if (!testTaskId) {
      throw new Error('Invalid id')
    }

    const task = await this.tasksRepository.findTaskById(taskId)
    if (!task) {
      throw new Error('Task not founded!')
    }

    const taskUpdated = await this.tasksRepository.updatedTask(taskId, title, description, done)

    return taskUpdated as any
  }
}
