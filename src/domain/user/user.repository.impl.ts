import { IUserRepository } from './user.repository';
import { User } from './user.model';
import { Inject, Injectable } from '@nestjs/common';
import { KNEX_CONNECTION } from '@nestjsplus/knex';
import { Knex } from 'knex';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(@Inject(KNEX_CONNECTION) private readonly knex: Knex) {}

  async findByUsername(username: string): Promise<User | undefined> {
    return this.knex<User>('users').where({ username }).first();
  }

  async findById(id: number): Promise<User | undefined> {
    return this.knex<User>('users').where({ id }).first();
  }

  async findAll(): Promise<User[]> {
    return this.knex<User>('users').select('*');
  }

  async create(user: User): Promise<User> {
    const [createdUser] = await this.knex<User>('users')
      .insert(user)
      .returning('*');
    return createdUser;
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    const [updatedUser] = await this.knex<User>('users')
      .where({ id })
      .update(updateUserDto)
      .returning('*');
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    await this.knex<User>('users').where({ id }).del();
  }
}
