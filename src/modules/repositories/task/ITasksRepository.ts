import { Task } from '../../entities/Task'

export interface ITasksRepository {
  createTask (userId: string, title: string, description: string, done: boolean, createdAt: Date): Promise<Task>
  deleteTaskById (taskId: string): Promise<void>
  findTaskById (taskId: string): Promise<Task>
  findTasksByTitleAndDone (userId: string, title: string, done: boolean): Promise<Task[]>
  updatedTask (taskId: string, title: string, description: string, done: boolean): Promise<void>
}
