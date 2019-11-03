import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find Maria', async () => {
    const foundUser = await service.findOne('maria');
    expect(foundUser).toEqual({
      userId: 3,
      username: 'maria',
      password: 'guess',
      roles: ['admin'],
    });
  });

  it('should return undefined when username not found', async () => {
    const foundUser = await service.findOne('mario');
    expect(foundUser).toBeUndefined();
  });
});
