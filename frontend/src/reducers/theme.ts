import { createAction, createReducer } from 'redux-act';

// Type
export type Theme = 'dark' | 'light';

// State
const initialState: Theme = 'dark';

// Actions
const setTheme = createAction('set theme');

// Reducer
export default createReducer<Theme>(
  {
    [setTheme.toString()]: (_state, payload: Theme) => payload,
  },
  initialState,
);
