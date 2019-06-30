import {
  IsEmail,
  IsNotEmpty,
  Length,
  ValidationArguments,
} from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { User } from '../entities/user';
import { IsEmailAlreadyExist } from './validators/is-email-already-exist';
import { IsUsernameAlreadyExist } from './validators/is-user-name-already-exist';

function getPlural(value: number) {
  return value > 1 ? 's' : '';
}

const messageNotEmpty = 'Should not be empty';

const messageLength = (args: ValidationArguments) => {
  const [min, max] = args.constraints;
  if (min > args.value.length) {
    return `Too short, minimum length is ${min} character${getPlural(min)}`;
  } else if (max < args.value.length) {
    return `Too long, maximum length is ${max} character${getPlural(max)}`;
  }
  return `Length should be between ${min} and ${max} characters`;
};

@InputType()
export class CreateAnAccountInput implements Partial<User> {
  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  @Length(2, 100, { message: messageLength })
  @IsUsernameAlreadyExist()
  username: string;

  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  @IsEmail(undefined, { message: 'Must be a valid email' })
  @IsEmailAlreadyExist()
  email: string;

  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  @Length(2, 100, { message: messageLength })
  password: string;
}

@InputType()
export class SignInInput implements Partial<User> {
  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  @Length(2, 100, { message: messageLength })
  username: string;

  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  @Length(2, 100, { message: messageLength })
  password: string;
}

@InputType()
export class ForgotPasswordInput implements Partial<User> {
  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  @IsEmail()
  email: string;
}

@InputType()
export class ChangePasswordInput implements Partial<User> {
  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  token: string;

  @Field()
  @IsNotEmpty({ message: messageNotEmpty })
  @Length(2, 100, { message: messageLength })
  password: string;

  @Field({ nullable: true })
  autoSignIn?: boolean;
}
