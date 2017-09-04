import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { AuthScreen } from './components';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

var wilddog = require('wilddog');

class App extends Component {
  componentWillMount() {
    wilddog.initializeApp({
      authDomain: "wd1607116684hnxnbz.wilddog.com"
    });
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(thunk))}>
        <AuthScreen />
      </Provider>
    );
  }
}

export default App;