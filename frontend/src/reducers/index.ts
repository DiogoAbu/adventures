import { combineReducers, Reducer } from 'redux';

import auth from './auth';
import theme from './theme';

const rootReducer = combineReducers({
  auth,
  theme,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer as Reducer<RootState>;
