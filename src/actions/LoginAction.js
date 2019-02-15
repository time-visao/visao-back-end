import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN_UNAUTHORIZED, LOGOUT } from './types';
import api from '../services/api';

//FACEBOOK RESPONSE AND LOGIN
export const handleFacebookLogin = res => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  if (res.accessToken) {
    var last_name = res.name.substr(res.name.indexOf(' ') + 1); //Extract the first name as the  substring before the first space
    var first_name = res.name.substr(0, res.name.indexOf(' ') + 1); //Extract the last name as the  substring after the first space
    var body_post = {
      profile: {
        id: res.userID,
        first_name: first_name,
        last_name: last_name,
        email: res.email,
      },
    };
    const urlLogin = '/auth/users/facebook';
    await api
      .post(urlLogin, body_post)
      .then(res2 => {
        localStorage.setItem('auth_token', res2.data.jwt);
        window.location.href = '../portal/';
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: LOGIN_FAILURE });
      });
  } else {
    console.log('Erro no login');
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const handleSubmit = (email, password) => async dispatch => {
  dispatch({ type: LOGIN_REQUEST });
  var body_post = {
    email: email,
    password: password,
  };
  const urlLogin = '/auth/users/login';
  await api
    .post(urlLogin, { email: body_post.email, password: body_post.password })
    .then(res => {
      localStorage.setItem('auth_token', res.data.jwt);
      window.location.href = '../portal/';
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const getAuthUserRequest = () => async dispatch => {
  const urlAuth = '/user/inhabitants/me';
  await api
    .get(urlAuth)
    .then(res => {
      // console.log(res);      
      if (res.data.data.attributes.coworker) {
        dispatch({ type: LOGIN_SUCCESS, payload: res.data.data });
        // window.location.href = '../portal';
      } else {
        console.log('Usuario nao autorizado');
        dispatch({ type: LOGIN_UNAUTHORIZED });
      }
    })
    .catch(e => {
      console.log(e);
      dispatch({ type: LOGIN_FAILURE });
    });
};

export const handleLogout = () => async dispatch => {
  localStorage.removeItem('auth_token');
  window.location.href = '../login';
  dispatch({ type: LOGOUT });
};
