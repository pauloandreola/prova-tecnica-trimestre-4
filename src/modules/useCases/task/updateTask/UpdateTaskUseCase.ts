import { inject, injectable } from 'tsyringe'

import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class UpdateTaskUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (taskId: string, title: string, description: string, done: boolean): Promise<void> {
    const task = await this.tasksRepository.findTaskById(taskId)
    if (!task) {
      throw new Error('Task not found!')
    }

    const updatedTask = await this.tasksRepository.updatedTask(taskId, title, description, done)

    return updatedTask
  }
}
