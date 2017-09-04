import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AppNavigationWithState from './navigators/AppNavigator'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { WILDDOG_APP_ID } from './config';
import thunk from 'redux-thunk';
import reducers from './reducers';

var wilddog = require('wilddog');

class App extends Component {
  componentWillMount() {
    wilddog.initializeApp({
      authDomain: `${WILDDOG_APP_ID}.wilddog.com`,
      syncURL: `https://${WILDDOG_APP_ID}.wilddogio.com`
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        <AppNavigationWithState />
      </Provider>
    );
  }
}

export default App;