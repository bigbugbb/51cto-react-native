import { FOOD_INIT, FOOD_NAME_CHANGED, FOOD_PRICE_CHANGED} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  imageUrl: '',
  price: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FOOD_INIT:
      return { ...action.payload };
    case FOOD_NAME_CHANGED:
      return { ...state, name: action.payload };
    case FOOD_PRICE_CHANGED:
      return { ...state, price: action.payload };
  }
  return state;
}