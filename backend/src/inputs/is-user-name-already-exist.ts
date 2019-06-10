import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { UserModel } from '../entities/user';

@ValidatorConstraint({ async: true })
export class IsUsernameAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate(username: string) {
    const found = await UserModel.findOne({ username }).exec();
    return !found;
  }
  defaultMessage(_args: ValidationArguments) {
    return 'Username already exists';
  }
}

export function IsUsernameAlreadyExist(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUsernameAlreadyExistConstraint,
    });
  };
}
