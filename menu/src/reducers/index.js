import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NavReducer from './NavReducer';
import FoodReducer from './FoodReducer';
import MenuListReducer from './MenuListReducer';

export default combineReducers({
  auth: AuthReducer,
  nav: NavReducer,
  food: FoodReducer,
  menu_list: MenuListReducer
});