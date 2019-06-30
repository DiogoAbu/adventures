// tslint:disable-next-line:no-implicit-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import serverInit from '../../src/services/server';

(async () => {
  // Create and start mongodb
  const mongoServer = new MongoMemoryServer({
    binary: {
      version: '4.0.10',
    },
  });

  const mongoUri = await mongoServer.getConnectionString();

  let app: any;

  // Kicks off Mocha
  run();

  before(async function() {
    // Start server
    app = await serverInit();

    // Set url
    this.serverUrl = app.url;

    // Connect to mongoose
    await mongoose.connect(mongoUri, {
      autoIndex: false,
      autoReconnect: false,
      connectTimeoutMS: 10000,
      useNewUrlParser: true,
    });
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    await app.server.stop();
  });
})();
