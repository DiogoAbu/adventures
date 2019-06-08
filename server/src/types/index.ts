// tslint:disable-next-line:no-implicit-dependencies
import { Request } from 'express';

import { Permission } from 'accesscontrol';
import { ObjectId } from 'mongodb';
import { InstanceType } from 'typegoose';

import { User } from '../entities/user';

export type MyRequest = Request;

export interface MyContext {
  user: InstanceType<User> | null;
  permissions: Permission[];
}

export interface Payload {
  __uuid: string;
  id: ObjectId;
}
