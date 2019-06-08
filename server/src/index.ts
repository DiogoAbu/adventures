import './services/dotenv';

import db from './services/db';
import server from './services/server';

(async () => {
  await db();
  await server();
})();

process.on('uncaughtException', (_exception) => {
  // console.log(exception);
});

process.on('unhandledRejection', (_reason, _p) => {
  // console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});
