import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersMapper } from './users.mapper';
import { UserDocument } from './user.schema';
import { UpdateUserDto } from './_utils/dto/request/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getCurrentUser = UsersMapper.toGetUserDto;

  updateUser = (user: UserDocument, updateUser: UpdateUserDto) =>
    this.usersRepository.update(user, updateUser).then(this.getCurrentUser);
}
