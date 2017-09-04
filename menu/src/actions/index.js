import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL, 
  LOGIN_USER_START,
  FOOD_INIT,
  FOOD_NAME_CHANGED,
  FOOD_PRICE_CHANGED,
  FOOD_IMAGE_CHANGED,
  MENU_LIST_UPDATE_START,
  MENU_LIST_UPDATE_SUCCESS,
  MENU_LIST_UPDATE_FAIL
} from './types';
import { FILE_UPLOAD_URL, FILE_DELETE_URL } from '../config';

var wilddog = require('wilddog');
const uuidv4 = require('uuid/v4');

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

export const foodImageChanged = (imageUrl) => {
  return {
    type: FOOD_IMAGE_CHANGED,
    payload: imageUrl
  }
}

export const initFood = (food) => {
  return {
    type: FOOD_INIT,
    payload: food
  }
}

const updateMenuList = (refToMenuList, key, food) => {
  // update wilddog data with sync
  if (key) {
    refToMenuList.child(key).update(food);
  } else {
    refToMenuList.push(food);
  }
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
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

    // food.imageUrl: '', 'asset....', 'http://.....'
    if (food.imageUrl) {
      let protocol = food.imageUrl.split("://")[0];

      if (protocol !== 'http') {
        // build the body with local image url
        const file = {
          uri: food.imageUrl,
          name: `${userId}:${uuidv4()}.jpg`,
          type: 'image/jpg'
        }
        const body = new FormData()
        body.append('file', file)

        // use fetch api to upload image
        fetch(FILE_UPLOAD_URL, {
          method: 'POST',
          body,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(checkStatus)
        .then(response => response.json())
        .then(responseJson => {
          food.imageUrl = responseJson.url;
          updateMenuList(refToMenuList, key, food);
        })
        .catch(error => console.log(error));
      } else {
        // image is on the cloud
        updateMenuList(refToMenuList, key, food);
      }
    } else {
      // there is no image selected
      updateMenuList(refToMenuList, key, food);
    }
  }
}

export const deleteFood = (key, food, navigation) => {
  let userId = wilddog.auth().currentUser.uid;
  let refToMenuList = wilddog.sync().ref(`/users/${userId}/menu_list`);

  return (dispatch) => {
    refToMenuList.on('value', (snapshot) => {
      dispatch({ type: MENU_LIST_UPDATE_SUCCESS, payload: snapshot });
      navigation.goBack();
    }, (error) => {
      dispatch({ type: MENU_LIST_UPDATE_FAIL, payload: error });
    });

    // food.imageUrl: '', 'asset....', 'http://.....'
    if (food.imageUrl) {
      let protocol = food.imageUrl.split("://")[0];

      if (protocol === 'http') {
        // build the oss object key
        let name = food.imageUrl.split(/[/]+/).pop();

        // use fetch api to upload image
        fetch(FILE_DELETE_URL + `/${name}`, {
          method: 'DELETE',
          headers: { 'Accept': 'application/json' }
        })
        .then(checkStatus)
        .then(response => {
          if (key) {
            refToMenuList.child(key).remove();
          }
        })
        .catch(error => console.log(error));
      } else {
        if (key) {
          refToMenuList.child(key).remove();
        }
      }
    } else {
      if (key) {
        refToMenuList.child(key).remove();
      }
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
