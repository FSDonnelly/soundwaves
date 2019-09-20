import axios from 'axios';

import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export const loginUser = dataToSubmit => async dispatch => {
  const res = await axios
    .post('api/users/login', dataToSubmit)
    .then(res => res.data);

  dispatch({ type: LOGIN_USER, payload: res });
};

export const registerUser = dataToSubmit => async dispatch => {
  const res = await axios
    .post('api/users/register', dataToSubmit)
    .then(res => res.data);

  dispatch({ type: REGISTER_USER, payload: res });
};

export const auth = () => async dispatch => {
  const res = await axios.get('api/users/auth').then(res => res.data);

  await dispatch({ type: AUTH_USER, payload: res });
};
