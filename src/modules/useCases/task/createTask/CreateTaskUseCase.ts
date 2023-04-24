import { inject, injectable } from 'tsyringe'

import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class CreateTaskUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (userId: string, title: string, description: string, done: boolean): Promise<void> {
    await this.tasksRepository.createTask(userId, title, description, done)
  }
}
