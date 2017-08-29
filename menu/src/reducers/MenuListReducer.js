import {
  MENU_LIST_UPDATE_START,
  MENU_LIST_UPDATE_SUCCESS, 
  MENU_LIST_UPDATE_FAIL
} from '../actions/types';

const INITIAL_STATE = { loading: false, data: [] };

const dataFromAction = (action) => {
  let data = [];
  action.payload.forEach((childSnapshot) => {
    data.push({ key: childSnapshot.key(), food: childSnapshot.val() });
  })
  return data;
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MENU_LIST_UPDATE_START:
      return { ...state, loading: true };
    case MENU_LIST_UPDATE_SUCCESS:            
      return { loading: false, data: dataFromAction(action) };
    case MENU_LIST_UPDATE_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}