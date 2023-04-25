import { User } from '../../entities/user'

export interface IUsersRepository {
  createUser (name: string, email: string, password: string): Promise<User>;
  findUserByEmail (email: string): Promise<User>;
  findUserById (userId: string): Promise<User>;
  updateRefreshToken (userId: string, refreshToken: string, createdAt: Date): Promise<void>;
}
