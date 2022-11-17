import { GetUserDto } from './_utils/dto/response/get-user.dto';
import { UserDocument } from './user.schema';

export class UsersMapper {
  static toGetUserDto = (user: UserDocument): GetUserDto => ({ username: user.username });
}
