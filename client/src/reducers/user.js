import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../actions/types';

const initialState = {};

export default function(state = initialState, { payload, type }) {
  switch (type) {
    case AUTH_USER:
      return {
        ...state,
        userData: payload
      };
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: payload
      };
    case REGISTER_USER:
      return {
        ...state,
        register: payload
      };

    default:
      return state;
  }
}
