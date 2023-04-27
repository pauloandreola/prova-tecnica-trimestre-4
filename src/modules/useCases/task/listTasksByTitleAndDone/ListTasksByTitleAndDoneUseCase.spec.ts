import 'reflect-metadata'

import { TasksRepositoryInMemory } from '../../../../modules/repositories/task/in-memory/TasksRepositoryInMemory'
import { ListTasksByTitleAndDoneUseCase } from './ListTasksByTitleAndDoneUseCase'

let listTasksByTitleAndDoneUseCase: ListTasksByTitleAndDoneUseCase
let tasksRepositoryInMemory: TasksRepositoryInMemory

describe('List a task', () => {
  beforeEach(async () => {
    tasksRepositoryInMemory = new TasksRepositoryInMemory()
    listTasksByTitleAndDoneUseCase = new ListTasksByTitleAndDoneUseCase(tasksRepositoryInMemory)
  })

  it('should be possible to list a task', async () => {
    await tasksRepositoryInMemory.createTask('01', 'title01', 'description01', true)
    const tasks = await tasksRepositoryInMemory.findTasksByTitleAndDone('01', 'title01', true)

    expect(tasks).toEqual(tasks)
  })

  it('should not be possible to list a non-existing task', async () => {
    await expect(listTasksByTitleAndDoneUseCase.execute('', 'title01', null)
    ).rejects.toEqual(new Error('User not found!'))
  })
})
