import React from 'react';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { AuthScreen, MenuListScreen } from '../components';

export const AppNavigator = StackNavigator({
  Auth: { screen: AuthScreen },
  MenuList: { screen: MenuListScreen }
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator
    navigation={addNavigationHelpers({ dispatch, state: nav })}
    screenProps={{tintColor: '#007AFF'}}
  />
)

const mapStateToProps = (state) => ({
  nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState);