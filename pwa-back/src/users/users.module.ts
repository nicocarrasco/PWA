import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './users.repository';
import { User, UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserExistsRule } from './_utils/user-exist.rule';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UsersService, UsersRepository, UserExistsRule],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
