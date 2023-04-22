import { container } from 'tsyringe'
import { ITasksRepository } from '../../modules/repositories/task/ITasksRepository'
import { TasksRepository } from '../../modules/repositories/task/TasksRepository'
import { IUsersRepository } from '../../modules/repositories/user/IUsersRepository'
import { UsersRepository } from '../../modules/repositories/user/UsersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<ITasksRepository>('TasksRepository', TasksRepository)
