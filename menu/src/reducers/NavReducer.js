import { AppNavigator } from '../navigators/AppNavigator';

const INITIAL_STATE = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Auth')
);

export default (state = INITIAL_STATE, action) => {
  let nextState;
  switch (action.type) {
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}