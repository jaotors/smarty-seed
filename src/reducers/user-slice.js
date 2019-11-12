import { createSlice } from 'redux-starter-kit';

const initialState = {
  email: '',
  id: -1,
  last_name: '',
  first_name: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.id = payload.id;
      state.email = payload.email;
      state.first_name = payload.first_name;
      state.last_name = payload.last_name;
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

export default userSlice;
