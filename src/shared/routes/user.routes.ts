import { Router } from 'express'

import { CreateUserController } from '../../modules/useCases/user/createUser/CreateUserController'
import { LoginUserController } from '../../modules/useCases/user/loginUser/LoginUserController'

export const routerUser = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()

routerUser.post('/', createUserController.handle)
routerUser.post('/login', loginUserController.handle)
