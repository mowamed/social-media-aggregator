import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from '@nestjsplus/knex';
import { SocialAccountModule } from './application/social-account/social-account.module';
import { PostModule } from './application/post/post.module';
import { AuthModule } from './application/auth/auth.module';
import { UserModule } from './application/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    KnexModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService) => ({
        client: 'pg',
        connection: {
          host: configService.get('DB_HOST'),
          user: configService.get('DB_USER'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
        },
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    SocialAccountModule,
    PostModule,
  ],
})
export class AppModule {}
