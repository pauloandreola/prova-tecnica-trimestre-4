import 'reflect-metadata'

import { TasksRepositoryInMemory } from '../../../repositories/task/in-memory/TasksRepositoryInMemory'
import { ListTaskByIdUseCase } from './ListTaskByIdUseCase'

let listTaskByIdUseCase: ListTaskByIdUseCase
let tasksRepositoryInMemory: TasksRepositoryInMemory

describe('List a task', () => {
  beforeEach(async () => {
    tasksRepositoryInMemory = new TasksRepositoryInMemory()
    listTaskByIdUseCase = new ListTaskByIdUseCase(tasksRepositoryInMemory)
  })

  it('should be possible to list a task', async () => {
    await tasksRepositoryInMemory.createTask('01', 'title01', 'description01', true)
    const task = await tasksRepositoryInMemory.findTaskById('01')

    expect(task).toEqual(task)
  })

  it('should not be possible to list a non-existing task', async () => {
    await expect(listTaskByIdUseCase.execute('', '01')
    ).rejects.toEqual(new Error('Task not found!'))
  })
})
