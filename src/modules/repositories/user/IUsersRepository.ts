import { User } from '../../entities/User'

export interface IUsersRepository {
  createUser (name: string, email: string, password: string): Promise<void>;
  findUserByEmail (email: string): Promise<User>;
  findUserById (userId: string): Promise<User>;
  updateRefreshToken (userId: string, refreshToken: string): Promise<void>;
}
