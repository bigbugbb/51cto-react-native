import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL, 
  LOGIN_USER_START,
  FOOD_INIT,
  FOOD_NAME_CHANGED,
  FOOD_PRICE_CHANGED,
  MENU_LIST_UPDATE_START,
  MENU_LIST_UPDATE_SUCCESS,
  MENU_LIST_UPDATE_FAIL
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
            loginUserFail(dispatch, '用户登录错误');
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

export const foodNameChanged = (text) => {
  return {
    type: FOOD_NAME_CHANGED,
    payload: text
  }
}

export const foodPriceChanged = (text) => {
  return {
    type: FOOD_PRICE_CHANGED,
    payload: text
  }
}

export const initFood = (food) => {
  return {
    type: FOOD_INIT,
    payload: food
  }
}

export const saveFood = (key, food, navigation) => {
  let userId = wilddog.auth().currentUser.uid;
  let refToMenuList = wilddog.sync().ref(`/users/${userId}/menu_list`);

  return (dispatch) => {
    refToMenuList.on('value', (snapshot) => {
      dispatch({ type: MENU_LIST_UPDATE_SUCCESS, payload: snapshot });
      navigation.goBack();
    }, (error) => {
      dispatch({ type: MENU_LIST_UPDATE_FAIL, payload: error });
    });

    if (key) {
      refToMenuList.child(key).update(food);
    } else {
      refToMenuList.push(food);
    }
  }
}

export const deleteFood = (key, navigation) => {
  let userId = wilddog.auth().currentUser.uid;
  let refToMenuList = wilddog.sync().ref(`/users/${userId}/menu_list`);

  return (dispatch) => {
    refToMenuList.on('value', (snapshot) => {
      dispatch({ type: MENU_LIST_UPDATE_SUCCESS, payload: snapshot });
      navigation.goBack();
    }, (error) => {
      dispatch({ type: MENU_LIST_UPDATE_FAIL, payload: error });
    });

    if (key) {
      refToMenuList.child(key).remove();
    }
  }
}

export const fetchMenuList = () => {
  let userId = wilddog.auth().currentUser.uid;
  let refToMenuList = wilddog.sync().ref(`/users/${userId}/menu_list`);

  return (dispatch) => {
    dispatch({ type: MENU_LIST_UPDATE_START });
    refToMenuList.on('value', (snapshot) => {
      dispatch({ type: MENU_LIST_UPDATE_SUCCESS, payload: snapshot });
    }, (error) => {
      dispatch({ type: MENU_LIST_UPDATE_FAIL, payload: error });
    });
  }
}
