import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        userId: action.userId,
      };
    case LOGOUT:
      return {
        ...initialState,
        userId: null
      };
    default:
      return state;
  }
};