import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { hashSync } from 'bcrypt';
import { UpdateUserDto } from './_utils/dto/request/update-user.dto';
import { LocationDocument } from '../locations/locations.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private model: Model<UserDocument>) {}

  private orThrow<T>(x: T | null | undefined): T {
    if (!x) throw new NotFoundException(`USER_NOT_FOUND`);
    return x;
  }

  private readonly fullPopulate = ['locations'];

  findOneById = (id: string) => this.model.findOne({ _id: id }).exec();

  findOneByUsername = (username: string) => this.model.findOne({ username: username }).exec();

  findOneByIdOrThrow = (id: string) => this.findOneById(id).then(this.orThrow);

  findAllByLocation = (location: LocationDocument) => this.model.find({ locations: location }).exec();

  create = (username: string, password: string) =>
    this.model.create({ username: username, password: hashSync(password, 12) });

  update = (user: UserDocument, updateUser: UpdateUserDto) =>
    this.model
      .findByIdAndUpdate(
        user._id,
        { locations: updateUser.locations, webpush: updateUser.webpush },
        { returnDocument: 'after', populate: this.fullPopulate },
      )
      .exec()
      .then(this.orThrow);
}
