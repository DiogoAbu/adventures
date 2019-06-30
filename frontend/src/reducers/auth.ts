import { createAction, createReducer } from 'redux-act';

// Type
export interface AuthState {
  user: {};
  token: string | null;
}

// State
const initialState: AuthState = {
  user: {},
  token: null,
};

// Actions
export const setToken = createAction('set token', (token) => token);

// Reducer
export default createReducer<AuthState>(
  {
    [setToken.toString()]: (state, payload: AuthState['token']) => ({
      ...state,
      token: payload,
    }),
  },
  initialState,
);
