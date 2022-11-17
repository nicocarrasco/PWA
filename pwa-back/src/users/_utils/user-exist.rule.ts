import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UsersRepository } from '../users.repository';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@ValidatorConstraint({ name: 'UserExists', async: true })
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
  constructor(private usersRepository: UsersRepository) {}

  async validate(id: string, args: ValidationArguments) {
    if (!Types.ObjectId.isValid(id)) return false;
    return !!(await this.usersRepository.findOneById(id));
  }

  defaultMessage = (args: ValidationArguments) => `${args.property} didn't find user`;
}

export function UserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'UserExists',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistsRule,
    });
  };
}
