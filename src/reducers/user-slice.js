import { createSlice } from 'redux-starter-kit';

const initialState = {
  username: '',
  type: -1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.username = payload.user;
      state.type = payload.type;
      return state;
    },
  },
});

export const { name: slice, actions, reducer } = userSlice;

/**
 * Selectors
 *
 * @todo probably best to use simple _.get instead of createSelectors here
 * as createSelectors does memoization that we probably doesnt need here
 */

const getUserType = state => state[slice].type;
export const selectors = {
  getUserType,
};

export default userSlice;
