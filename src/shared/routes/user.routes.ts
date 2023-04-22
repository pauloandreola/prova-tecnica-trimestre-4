import { Router } from 'express'

import { CreateUserController } from '../../modules/useCases/user/createUser/CreateUserController'
import { LoginUserController } from '../../modules/useCases/user/loginUser/LoginUserController'
import { RefreshTokenUserController } from '../../modules/useCases/user/refreshTokenUser/RefreshTokenUserController'

export const routerUser = Router()

const createUserController = new CreateUserController()
const loginUserController = new LoginUserController()
const refreshTokenUserController = new RefreshTokenUserController()

routerUser.post('/', createUserController.handle)
routerUser.post('/login', loginUserController.handle)
routerUser.post('/refreshtoken', refreshTokenUserController.handle)
