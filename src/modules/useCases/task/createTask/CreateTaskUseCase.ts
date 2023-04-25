import { inject, injectable } from 'tsyringe'

import { ITasksRepository } from '../../../repositories/task/ITasksRepository'
import { Task } from '../../../entities/Task'

@injectable()
export class CreateTaskUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (userId: string, title: string, description: string, done: boolean): Promise<Task> {
    if (!userId) {
      throw new Error('Please check the userId field blank!')
    }
    if (!title) {
      throw new Error('Please check the title field blank!')
    }
    if (!description) {
      throw new Error('Please check the description field blank!')
    }

    const task = await this.tasksRepository.createTask(userId, title, description, done)

    return task
  }
}
