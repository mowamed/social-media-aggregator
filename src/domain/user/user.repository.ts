import { NewUser, User } from './user.model';

export interface IUserRepository {
  findByUsername(username: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  create(user: NewUser): Promise<User>;
  update(id: number, updateUserDto: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
}

export const IUserRepositoryToken = 'IUserRepository';
