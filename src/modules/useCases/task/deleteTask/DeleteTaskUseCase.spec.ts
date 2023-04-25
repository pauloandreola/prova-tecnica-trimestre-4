import 'reflect-metadata'

import { TasksRepositoryInMemory } from '../../../../modules/repositories/task/in-memory/TasksRepositoryInMemory'
import { DeleteTaskUseCase } from './DeleteTaskUseCase'

let deleteTaskUseCase: DeleteTaskUseCase
let tasksRepositoryInMemory: TasksRepositoryInMemory

describe('Delete a task', () => {
  beforeEach(async () => {
    tasksRepositoryInMemory = new TasksRepositoryInMemory()
    deleteTaskUseCase = new DeleteTaskUseCase(tasksRepositoryInMemory)
  })

  it('should be possible to delete a task', async () => {
    await tasksRepositoryInMemory.createTask('01', 'title01', 'description01', true)
    const task = await tasksRepositoryInMemory.deleteTaskById('01')

    expect(task).toEqual(task)
  })

  it('should not be possible to delete a non-existing task', async () => {
    await expect(deleteTaskUseCase.execute('', '321')
    ).rejects.toEqual(new Error('Task not found!'))
  })
})
