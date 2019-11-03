import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PassportModule } from '@nestjs/passport';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: 'secretKey',
          signOptions: {
            expiresIn: 3600,
          },
        }),
        AuthModule,
        UsersModule,
      ],
      controllers: [AppController],
      providers: [AuthService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return access token', async () => {
      const req = {
        user: {
          userId: 1,
          username: 'john',
          password: 'changeme',
          roles: ['admin'],
        },
      };
      expect((await appController.login(req)).access_token).toBeDefined();
    });
  });
});
