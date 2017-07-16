// 1. 导入React和React Native
import React from 'react';
import ReactNative from 'react-native';

// 2. 创建我们的Component
const App = () => {
  return (
    <Text>Hello, React Native!</Text>
  )
};

// 3. 渲染Component
ReactNative.AppRegistry.registerComponent("albums", () => App);