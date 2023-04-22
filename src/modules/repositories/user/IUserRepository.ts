import { User } from '../../entities/User'

export interface IUserRepository {
  createUser(name: string, email: string, password: string): void;
  findUserByEmail(email: string): Promise<User>;
  updateRefreshToken(userId: string, refreshToken: string, createdAt: Date): Promise<void>;
}
