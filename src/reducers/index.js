import { reducer as login } from './login-slice';
import { reducer as user } from './user-slice';

const rootReducer = {
  user,
  login,
};

export default rootReducer;
