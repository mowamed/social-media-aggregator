import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../../domain/user/user.repository';
import { RegisterUserDto } from '../../domain/user/dto/register-user.dto';
import { User, NewUser } from '../../domain/user/user.model';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUserRepositoryToken) private userRepository: IUserRepository,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findByUsername(username);
  }

  async findById(id: number): Promise<User | undefined> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async create(registerUserDto: RegisterUserDto): Promise<User> {
    const hashedPassword = await hash(registerUserDto.password, 10);
    const newUser: NewUser = {
      ...registerUserDto,
      password: hashedPassword,
    };

    return this.userRepository.create(newUser);
  }

  async update(id: number, updateUserDto: Partial<User>): Promise<User> {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
