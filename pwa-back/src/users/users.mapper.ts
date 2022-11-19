import { GetUserDto } from './_utils/dto/response/get-user.dto';
import { UserDocument } from './user.schema';
import { LocationsMapper } from '../locations/locations.mapper';
import { GetUserLightDto } from './_utils/dto/response/get-user-light.dto';

export class UsersMapper {
  static toGetUserDto = (user: UserDocument): GetUserDto => ({
    username: user.username,
    locations: user.locations.map(LocationsMapper.toGetLocationDto),
  });

  static toGetUserLightDto = (user: UserDocument): GetUserLightDto => ({ username: user.username });
}
