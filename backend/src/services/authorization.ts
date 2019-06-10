import { AccessControl } from 'accesscontrol';
import { AuthChecker } from 'type-graphql';

import { MyContext } from '../types';

/**
 * In the case below a Guest can create an User.
 * // Role
 * guest: {
 *   // Resource
 *   user: {
 *     // Action : Possession
 *     'create:any': ['*'],
 */
const grants = {
  admin: {
    profile: {
      'create:any': ['*'],
      'read:any': ['*'],
      'update:any': ['*'],
      'delete:any': ['*'],
    },
  },
  user: {
    profile: {
      'create:own': ['*', '!role'],
      'read:own': ['*'],
      'update:own': ['*', '!role'],
      'delete:own': ['*'],
    },
  },
};

export const ac = new AccessControl(grants).lock();

export const roles = ac.getRoles();

/**
 * Check if user is signed-in, then check if has permission for the actions and resource passed.
 */
export const authChecker: AuthChecker<MyContext, string> = (
  { context },
  auths,
) => {
  const { user } = context;

  // Not signed-in
  if (!user) {
    return false;
  }

  // No permission to check
  if (auths.length === 0) {
    return true;
  }

  for (const auth of auths) {
    const [action, possession, resource] = auth.split(':');

    const permission = ac.permission({
      role: user.role,
      action: `${action}:${possession}`,
      resource,
    });
    // No permission match
    if (!permission) {
      return false;
    }
    // Permission denied
    if (!permission.granted) {
      return false;
    }
    // Store permission to filter data later
    context.permissions.push(permission);
  }

  return true;
};
