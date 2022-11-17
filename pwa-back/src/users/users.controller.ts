import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './_utils/decorator/user.decorator';
import { UserDocument } from './user.schema';
import { Protect } from '../auth/_utils/decorator/protect.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Protect()
  @Get('me')
  getUserMe(@User() user: UserDocument) {
    return this.usersService.getCurrentUser(user);
  }
}
