import 'reflect-metadata'

import { TasksRepositoryInMemory } from '../../../../modules/repositories/task/in-memory/TasksRepositoryInMemory'
import { CreateTaskUseCase } from './CreateTaskUseCase'

let createTaskUseCase: CreateTaskUseCase
let tasksRepositoryInMemory: TasksRepositoryInMemory

describe('Create a task', () => {
  beforeAll(async () => {
    tasksRepositoryInMemory = new TasksRepositoryInMemory()
    createTaskUseCase = new CreateTaskUseCase(tasksRepositoryInMemory)
  })

  it('should be to create a new task', async () => {
    await createTaskUseCase.execute('01', 'title01', 'description01', false)
  })
})

it('should not be possible to create new task without userId', async () => {
  await expect(createTaskUseCase.execute('', 'title01', 'description01', false)
  ).rejects.toEqual(new Error('Please check the userId field blank!'))
})

it('should not be possible to create new task without title', async () => {
  await expect(createTaskUseCase.execute('01', '', 'description01', false)
  ).rejects.toEqual(new Error('Please check the title field blank!'))
})

it('should not be possible to create new task without description', async () => {
  await expect(createTaskUseCase.execute('01', 'title01', '', false)
  ).rejects.toEqual(new Error('Please check the description field blank!'))
})
