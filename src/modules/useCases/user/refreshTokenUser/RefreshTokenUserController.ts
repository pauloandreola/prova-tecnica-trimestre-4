import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RefreshTokenUserUseCase } from './RefreshTokenUserUseCase'

export class RefreshTokenUserController {
  async handle (request: Request, response: Response) {
    const { token } = request.body || request.query.token || request.headers['X-access-token']
    try {
      const refreshTokenUserUseCase = container.resolve(RefreshTokenUserUseCase)
      const refreshToken = await refreshTokenUserUseCase.execute(token)

      response.status(200).json(refreshToken)
    } catch (error) {
      return response.status(400).json(error.message)
    }
  }
}
