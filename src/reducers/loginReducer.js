import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_UNAUTHORIZED, LOGOUT } from '../actions/types.js';

export const loginReducer = (state = '', action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false,
      };

    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginError: true,
      };

    case LOGIN_UNAUTHORIZED:
      return {
        ...state,
        loginUnauth: true,
        loading: false,
      };
    case LOGOUT:
    return {
      ...state,
      loginUnauth: false,
      loginError: false,
      response: "",
      loading: false,
    }

    default:
      return state;
  }
};
