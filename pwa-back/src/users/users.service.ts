import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getCurrentUser = UsersMapper.toGetUserDto;
}
