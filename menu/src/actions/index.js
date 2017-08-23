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

export const loginUser = (email, password, navigation) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_START });
    wilddog.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        loginUserSuccess(dispatch, wilddog.auth().currentUser, navigation);
      })
      .catch(() => {
        wilddog.auth().createUserWithEmailAndPassword(email, password)
          .then((user) => {
            loginUserSuccess(dispatch, user, navigation);
          })
          .catch((error) => {
            loginUserFail('用户登录错误');
          })
      });
  }
}

const loginUserSuccess = (dispatch, user, navigation) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: user });
  navigation.navigate('MenuList');
}

const loginUserFail = (dispatch, error) => {
  dispatch({ type: LOGIN_USER_FAIL, payload: error });
}