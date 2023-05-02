import { Task } from '../../../entities/Task'
import { ITasksRepository } from '../../task/ITasksRepository'

export class TasksRepositoryInMemory implements ITasksRepository {
  private tasks: Task[] = []

  private _id = 1

  async createTask (userId: string, title: string, description: string, done: boolean): Promise<Task> {
    const task: Task = { userId, title, description, done, _id: '' }
    await this.tasks.push(task)
    return task
  }

  async deleteTaskById (taskId: string): Promise<void> {
    const index = await this.tasks.findIndex(task => task._id === taskId)
    if (index >= 0) {
      this.tasks.splice(index, 1)
    }
  }

  async findTaskById (taskId: string): Promise<Task> {
    const task = await this.tasks.find(task => task._id === taskId)
    return task
  }

  async findTasksByTitleAndDone (userId: string, title: string, done: boolean): Promise<Task[]> {
    const tasks = await this.tasks.filter((task => task.userId === userId) &&
        (task => task.title.toLowerCase().includes(title.toLowerCase())) &&
        (task => task.done === done)
    )
    return tasks
  }

  async updatedTask (taskId: string, title: string, description: string, done: boolean): Promise<void> {
    const index = await this.tasks.findIndex(task => task._id === taskId)
    if (index >= 0) {
      this.tasks[index].title = title
      this.tasks[index].description = description
      this.tasks[index].done = done
    }
  }
}
