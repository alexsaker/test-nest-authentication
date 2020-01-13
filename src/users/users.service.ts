import { Injectable } from '@nestjs/common';

export interface User {
  userId: number;
  password: string;
  username: string;
  roles: string[];
}

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
        roles: ['admin'],
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
        roles: ['user'],
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
        roles: ['admin'],
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
