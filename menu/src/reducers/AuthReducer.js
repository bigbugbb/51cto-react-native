import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL,
  LOGIN_USER_START 
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  authenticating: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case LOGIN_USER_FAIL:
      return { ...state, error: action.payload, authenticating: false }
    case LOGIN_USER_START:
      return { ...state, user: null, authenticating: true, error: '' }
    default:
      return state;
  }
}