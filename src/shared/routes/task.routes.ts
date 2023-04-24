import { Router } from 'express'

import { CreateTaskController } from '../../modules/useCases/task/createTask/CreateTaskController'
import { DeleteTaskController } from '../../modules/useCases/task/deleteTask/DeleteTaskController'
import { ListTaskController } from '../../modules/useCases/task/listTask/ListTaskController'
import { ListTasksByTitleAndDoneController } from '../../modules/useCases/task/listTasksByTitleAndDone/ListTasksByTitleAndDoneController'
import { UpdatedTaskController } from '../../modules/useCases/task/updateTask/UpdateTaskController'

import { authenticateToken } from '../middlewares/authenticateToken'

export const routerTask = Router()

const createTaskController = new CreateTaskController()
const deleteTaskController = new DeleteTaskController()
const listTaskController = new ListTaskController()
const listTasksByTitleAndDoneController = new ListTasksByTitleAndDoneController()
const updatedTaskController = new UpdatedTaskController()

routerTask.use(authenticateToken)

routerTask.post('/', createTaskController.handle)
routerTask.delete('/:id', deleteTaskController.handle)
routerTask.get('/:id', listTaskController.handle)
routerTask.get('/filter/task/', listTasksByTitleAndDoneController.handle)
routerTask.put('/', updatedTaskController.handle)
