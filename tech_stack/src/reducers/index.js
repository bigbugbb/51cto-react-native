import { combineReducers } from 'redux';
import TechReducer from './TechReducer';

export default combineReducers({
  techs: TechReducer
})

// console.log(store.getState())
// {
  // techs: [
  //   { id: 1, title: "Webpack", description: "xxxx" },
  //   { ... },
  //   ....
  // ]
// }