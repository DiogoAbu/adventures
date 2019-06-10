import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { v4 as uuid } from 'uuid';

import { User, UserModel } from '../entities/user';
import {
  ChangePasswordInput,
  ForgotPasswordInput,
  SignInInput,
  SignUpInput,
} from '../inputs/user';
import { toToken } from '../services/authentication';
import { MyContext } from '../types';

const DAYS = parseInt(process.env.PASSWORD_RESET_EXPIRE_DAYS as string) || 1;

@Resolver()
export class UserResolver {
  @Authorized(['read:own:profile'])
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext) {
    const userData = ctx.user!.toObject();
    const filtered = ctx.permissions[0].filter(userData);
    return filtered;
  }

  @Mutation(() => Boolean)
  async signUp(@Arg('data') { username, email, password }: SignUpInput) {
    await UserModel.create({
      username,
      email,
      password,
    });

    return true;
  }

  @Mutation(() => String, { nullable: true })
  async signIn(@Arg('data') { username, password }: SignInInput) {
    const user = await UserModel.findOne({ username }).exec();

    if (user && (await user.matchPassword(password))) {
      return toToken(user);
    }

    return null;
  }

  @Mutation(() => Boolean, {
    description:
      'Find the user, store an expirable token, and send it to the email.',
  })
  async forgotPassword(@Arg('data') { email }: ForgotPasswordInput) {
    const user = await UserModel.findOne({ email }).exec();

    if (!user) {
      // Returns true even if not found to not disclose the existence of the email
      return true;
    }

    // Create token until it's unique
    let resetToken = uuid();
    while (await UserModel.findOne({ passwordResetToken: resetToken }).exec()) {
      resetToken = uuid();
    }

    // Get date and add expiration days
    const date = new Date();
    date.setDate(date.getDate() + DAYS);

    // Set on found user document
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = date;

    await user.save();

    return true;
  }

  @Mutation(() => Boolean, {
    description:
      'Find the user related to the token, check its validity and update the password.',
  })
  async changePassword(@Arg('data') { token, password }: ChangePasswordInput) {
    const user = await UserModel.findOne({ passwordResetToken: token }).exec();

    if (!user) {
      return false;
    }

    const now = new Date().getMilliseconds();
    const expires = user.passwordResetExpires!.getMilliseconds();

    // If today is greater than the expire date
    if (now > expires) {
      return false;
    }

    // Set on found user document
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    // if (autoSignIn) {
    //   return toToken(user);
    // }

    return true;
  }
}
