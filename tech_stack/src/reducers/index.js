import { combineReducers } from 'redux';
import TechReducer from './TechReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  techs: TechReducer,
  selectTechId: SelectionReducer
})

// console.log(store.getState())
// {
  // techs: [
  //   { id: 1, title: "Webpack", description: "xxxx" },
  //   { ... },
  //   ....
  // ]
// }