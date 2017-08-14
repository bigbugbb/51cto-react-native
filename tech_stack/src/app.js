import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Header } from './components/common';
import TechList from './components/TechList';
import reducers from './reducers';

const App = () => {
  return (
    <Provider store={createStore(reducers)}>
      <View style={{ flex: 1 }}>
        <Header headerText="技术栈" />
        <TechList />
      </View>
    </Provider>
  )
}

export default App;