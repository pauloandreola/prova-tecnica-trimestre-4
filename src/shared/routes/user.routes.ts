import { Router } from 'express'

import { CreateUserController } from '../../modules/useCases/user/createUser/CreateUserController'

export const routerUser = Router()

const createUserController = new CreateUserController()

routerUser.post('/', createUserController.handle)
