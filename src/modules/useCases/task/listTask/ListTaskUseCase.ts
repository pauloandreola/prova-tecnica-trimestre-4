import { inject, injectable } from 'tsyringe'
import { ObjectId } from 'mongodb'

import { Task } from '../../../entities/Task'
import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class ListTaskUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (taskId: string): Promise<Task> {
    const task = await this.tasksRepository.findTaskById(taskId)
    if (!task) {
      throw new Error('Task not found!')
    }

    return task
  }
}
