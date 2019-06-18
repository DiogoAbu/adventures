import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  arrayProp as ArrayProp,
  instanceMethod,
  InstanceType,
  pre,
  prop as Prop,
  Ref,
  Typegoose,
} from 'typegoose';

import { roles } from '../services/authorization';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS as string) || 12;

@ObjectType()
@pre('save', hashPassword)
export class User extends Typegoose {
  @Field(() => ID, { nullable: true })
  readonly _id: ObjectId;

  @Field({ nullable: true })
  @Prop({ required: true, unique: true, trim: true })
  username: string;

  @Field({ description: 'Only for reseting password', nullable: true })
  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Field(() => String, { nullable: true })
  @Prop({ unique: true })
  passwordResetToken: string | undefined;

  @Field(() => Date, { nullable: true })
  @Prop()
  passwordResetExpires: Date | undefined;

  @Prop({ required: true, default: 'user', enum: roles })
  role: string;

  @Field(() => User)
  @ArrayProp({ itemsRef: User, default: [] })
  chars: Array<Ref<User>>;

  @instanceMethod
  matchPassword(this: InstanceType<User>, plainPassword: string) {
    return bcrypt.compare(plainPassword, this.password);
  }
}

/**
 * Check if password is modified and replace it with its encrypted version.
 * Used on pre-hook 'save'
 */
async function hashPassword(this: InstanceType<User>, next: any) {
  // Only hash if password have been modified, or is new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    return next();
  } catch (err) {
    return next(err.message);
  }
}

export const UserModel = new User().getModelForClass(User);
