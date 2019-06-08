// @ts-ignore
import Paseto from 'paseto.js';
import { v4 as uuid } from 'uuid';

import { User, UserModel } from '../entities/user';
import { MyRequest, Payload } from '../types';

const SECRET_B64 =
  process.env.SECRET_B64 || 'qgX7B2XJ019cMJ8UB_gZEiZl49E3ZcIGEM8IphKgS08';

/**
 * Encrypt payload returning the token.
 */
export async function toToken(user: Partial<User>): Promise<string> {
  // Create key
  const key = new Paseto.SymmetricKey(new Paseto.V2());
  // Inject secret
  await key.base64(SECRET_B64);
  // Set token`s payload
  const payload: Payload = { __uuid: uuid(), id: user._id! };
  // Prepare payload
  const message = JSON.stringify(payload, null, 0);
  // Encrypt message returning the token
  return key.protocol().encrypt(message, key);
}

/**
 * Decrypt token returning the payload.
 */
export async function fromToken(token: string): Promise<{}> {
  // Create key
  const key = new Paseto.SymmetricKey(new Paseto.V2());
  // Inject secret
  await key.base64(SECRET_B64);
  // Decrypt token returning message
  const message = await key.protocol().decrypt(token, key);
  // Get token`s data
  const payload: Payload = JSON.parse(message);
  // Return payload
  return payload.id;
}

/**
 * Find token from request header Bearer, then return related User.
 */
export async function getUserFromHeader(req: MyRequest) {
  if (!req.headers || !req.headers.authorization) {
    return null;
  }

  const parts = req.headers.authorization.split(' ');
  if (parts.length !== 2) {
    return null;
  }

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) {
    return null;
  }

  // Check specific for Insomnia variable
  if (!token || token === 'null') {
    return null;
  }

  const id = await fromToken(token);
  const user = await UserModel.findById(id, '-password -__v').exec();

  return user;
}
