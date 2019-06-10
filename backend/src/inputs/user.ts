import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

import { User } from '../entities/user';
import { IsEmailAlreadyExist } from './is-email-already-exist';
import { IsUsernameAlreadyExist } from './is-user-name-already-exist';

@InputType()
export class SignUpInput implements Partial<User> {
  @Field()
  @Length(2, 100)
  @IsUsernameAlreadyExist()
  username: string;

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SignInInput implements Partial<User> {
  @Field()
  @Length(2, 100)
  username: string;

  @Field()
  password: string;
}

@InputType()
export class ForgotPasswordInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class ChangePasswordInput implements Partial<User> {
  @Field()
  token: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  autoSignIn?: boolean;
}
