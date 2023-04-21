import { Router } from 'express'
import { routerUser } from './user.routes'
import { routerTask } from './task.routes'

export const router = Router()

router.use('/tasks', routerTask)
router.use('/users', routerUser)
