import { inject, injectable } from 'tsyringe'
import { ObjectId } from 'mongodb'

import { Task } from '../../../entities/Task'
import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class ListTasksByTitleAndDoneUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (userId: string, title: string, done: boolean): Promise<Task[]> {
    if (!userId) {
      throw new Error('User not found!')
    }
    const tasks = await this.tasksRepository.findTasksByTitleAndDone(userId, title, done)

    return tasks
  }
}
