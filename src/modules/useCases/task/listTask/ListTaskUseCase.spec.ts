import 'reflect-metadata'

import { TasksRepositoryInMemory } from '../../../../modules/repositories/task/in-memory/TasksRepositoryInMemory'
import { ListTaskUseCase } from './ListTaskUseCase'

let listTaskUseCase: ListTaskUseCase
let tasksRepositoryInMemory: TasksRepositoryInMemory

describe('List a task', () => {
  beforeEach(async () => {
    tasksRepositoryInMemory = new TasksRepositoryInMemory()
    listTaskUseCase = new ListTaskUseCase(tasksRepositoryInMemory)
  })

  it('should be possible to list a task', async () => {
    await tasksRepositoryInMemory.createTask('01', 'title01', 'description01', true)
    const task = await tasksRepositoryInMemory.findTaskById('01')

    expect(task).toEqual(task)
  })

  it('should not be possible to list a non-existing task', async () => {
    await expect(listTaskUseCase.execute('')
    ).rejects.toEqual(new Error('Task not found!'))
  })
})
