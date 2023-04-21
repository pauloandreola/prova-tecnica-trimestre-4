import { container } from 'tsyringe'

import { IUserRepository } from '../../modules/repositories/users/IUserRepository'
import { UserRepository } from '../../modules/repositories/users/UserRepository'

container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
