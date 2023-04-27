import { inject, injectable } from 'tsyringe'

import { Task } from '../../../entities/Task'
import { ITasksRepository } from '../../../repositories/task/ITasksRepository'

@injectable()
export class ListTaskByIdUseCase {
  constructor (@inject('TasksRepository') private tasksRepository: ITasksRepository) {}

  async execute (taskId: string, userId): Promise<Task> {
    const task = await this.tasksRepository.findTaskById(taskId)
    if (!task) {
      throw new Error('Task not found!')
    }
    if (task.userId !== userId) {
      throw new Error('Task is the different user!')
    }
    return task
  }
}
