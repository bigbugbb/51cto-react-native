import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL, 
  LOGIN_USER_START
} from './types';

var wilddog = require('wilddog');

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    wilddog.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch({ type: LOGIN_USER_SUCCESS, payload: wilddog.auth().currentUser });
      })
      .catch(() => {
        wilddog.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
          })
          .catch((error) => {
            dispatch({ type: LOGIN_USER_FAIL, payload: '用户登录错误' });
          })
      });      
  }
}