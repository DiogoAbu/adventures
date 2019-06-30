import Debug from 'debug';
import mongoose from 'mongoose';

const debug = Debug('backend:db');

const defaultOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
};

mongoose.connection.on('connected', () => {
  debug('connected');
});

mongoose.connection.on('error', (err) => {
  debug(err);
});

mongoose.connection.on('disconnected', () => {
  debug('disconnected');
});

export default (
  uri?: string,
  options?: mongoose.ConnectionOptions | undefined,
) => {
  const mongoUri = uri || (process.env.MONGO_URI as string);
  return mongoose.connect(mongoUri, { ...defaultOptions, ...options });
};
