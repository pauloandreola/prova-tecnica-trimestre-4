import { ObjectId } from 'mongodb'

import { connectMongoDB } from '../../../shared/database/connection'
import { Task } from '../../entities/Task'
import { ITasksRepository } from './ITasksRepository'

export class TasksRepository implements ITasksRepository {
  async createTask (userId: string, title: string, description: string, done: boolean): Promise<void> {
    const database = await connectMongoDB()
    await database.collection('tasks').insertOne({ userId, title, description, done })
  }

  async deleteTaskById (taskId: string): Promise<void> {
    const database = await connectMongoDB()
    await database.collection('tasks').findOneAndDelete({ _id: new ObjectId(taskId) })
  }

  async findTaskById (taskId: string): Promise<Task> {
    const database = await connectMongoDB()
    const taskFounded = await database.collection('tasks').findOne({ _id: new ObjectId(taskId) })
    return taskFounded as any
  }

  async findTasksByTitleAndDone (userId: string, title: string, done: string): Promise<Task[]> {
    const database = await connectMongoDB()
    const query = { userId }
    if (done !== undefined) {
      query['done'] = { $eq: (done === 'false') }
    }

    if (title) {
      query['title'] = { $regex: title, $options: 'i' }
    }

    const tasks = await database.collection('tasks').find(query).toArray()
    return tasks as unknown as Task[]
  }

  async updatedTask (taskId: string, title: string, description: string, done: boolean): Promise<Task> {
    const database = await connectMongoDB()
    const taskUpdated = await database.collection('tasks').findOneAndUpdate({ _id: new ObjectId(taskId) }, { $set: { title, description, done } })
    return taskUpdated as any
  }
}