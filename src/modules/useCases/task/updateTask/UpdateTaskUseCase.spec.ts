import 'reflect-metadata'

import { TasksRepositoryInMemory } from '../../../../modules/repositories/task/in-memory/TasksRepositoryInMemory'
import { UpdateTaskUseCase } from './UpdateTaskUseCase'
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase'

let createTaskUseCase: CreateTaskUseCase
let updateTaskUseCase: UpdateTaskUseCase
let tasksRepositoryInMemory: TasksRepositoryInMemory

describe('Update a task', () => {
  beforeEach(async () => {
    tasksRepositoryInMemory = new TasksRepositoryInMemory()
    createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory)
    updateTaskUseCase = new UpdateTaskUseCase(tasksRepositoryInMemory)
  })

  it('should be possible to update a task', async () => {
    await createTaskUseCase.execute('01', 'title01', 'description01', false)
    await updateTaskUseCase.execute('02', 'title02', 'description02', true)
    const task = await tasksRepositoryInMemory.findTaskById('01')

    expect(task[0].taskId).toBe('02')
    expect(task[0].title).toBe('title02')
    expect(task[0].description).toBe('description02')
    expect(task[0].done).toBe(true)
  })

  it('should not be possible to list a non-existing task', async () => {
    await expect(updateTaskUseCase.execute('', 'title02', 'description02', true)
    ).rejects.toBeInstanceOf(Error)
  })
})
