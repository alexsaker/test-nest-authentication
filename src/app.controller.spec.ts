import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersModule } from './users/users.module';
import { jwtConstants } from './auth/constants';
import { Request } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secretOrPrivateKey: jwtConstants.secret,
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
    let token: string;
    it('should return access token', async () => {
      const req = {
        user: {
          userId: 1,
          username: 'john',
          password: 'changeme',
          roles: ['admin'],
        },
      };
      const result = await appController.login(req);
      token = result.access_token;
      expect(token).toBeDefined();
    });
    it('should return access token', async () => {
      const req = {
        user: {
          userId: 1,
          username: 'john',
          password: 'changeme',
          roles: ['admin'],
        },
      };
      expect(await appController.getProfile(req)).toEqual(req.user);
    });
  });
});
