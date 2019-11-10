import { createSlice } from 'redux-starter-kit';

const initialState = {
  loggedIn: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state) {
      state.loggedIn = true;
      return state;
    },
    logout(state) {
      state.loggedIn = false;
      return state;
    },
  },
});

export const { name: slice, actions, reducer } = loginSlice;

/**
 * Selectors
 *
 * @todo probably best to use simple _.get instead of createSelectors here
 * as createSelectors does memoization that we probably doesnt need here
 */

const isLoggedIn = state => state[slice].loggedIn;

export const selectors = {
  isLoggedIn,
};

export default loginSlice;
