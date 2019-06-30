import { AsyncStorage } from 'react-native';

import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import reducers from './reducers';

// Middleware: Redux Thunk (Async/Await)
const middleware = [thunk];

// Middleware: Redux Logger (For Development)
if (process.env.NODE_ENV !== 'production') {
  // tslint:disable-next-line:no-var-requires
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

// Middleware: Redux Persist Config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(...middleware));

  const persistor = persistStore(store);
  return { store, persistor };
};
