import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import Debug from 'debug';
import { buildSchema } from 'type-graphql';

import resolvers from '../resolvers';
import { MyContext } from '../types';
import { getUserFromHeader } from './authentication';
import { authChecker } from './authorization';

const debug = Debug('app:server');

export default async () => {
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  // Create GraphQL server
  const server = new ApolloServer({
    schema,
    context: async ({ req }): Promise<MyContext> => ({
      user: await getUserFromHeader(req),
      permissions: [],
    }),
  });

  // Start the server
  const { url } = await server.listen(process.env.PORT || 4000);

  debug('live on %s', url);

  return { server, url };
};
