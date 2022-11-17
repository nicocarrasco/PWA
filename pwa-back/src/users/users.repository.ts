import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException(`USER_NOT_FOUND`);
    return x;
  }

  findOneById = (id: string) => this.model.findOne({ _id: id }).exec();

  findOneByUsername = (username: string) => this.model.findOne({ username: username }).exec();

  findOneByUsernameOrThrow = (username: string) => this.findOneByUsername(username).then(this.orThrow);

  findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  create = (username: string, password: string) =>
    this.model.create({ username: username, password: hashSync(password, 12) });
}
