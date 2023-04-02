import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepositoryImpl } from '../../domain/user/user.repository.impl';
import { IUserRepositoryToken } from '../../domain/user/user.repository';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: IUserRepositoryToken,
      useClass: UserRepositoryImpl,
    },
    UserService,
  ],
})
export class UserModule {}
