if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line:no-var-requires no-implicit-dependencies
  require('dotenv-expand')(require('dotenv').config());
}
