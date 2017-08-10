import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Header } from './components/common';
import reducers from './reducers';

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View>
        <Header headerText="技术栈" />
      </View>
    </Provider>
  )
}

export default App;