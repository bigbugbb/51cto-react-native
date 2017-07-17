// 1. 导入React和React Native
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Header from './src/components/Header';

// 2. 创建我们的Component
class App extends Component {
  componentWillMount() {
    fetch('http://albums-app-dat.oss-cn-hangzhou.aliyuncs.com/albums.json')
      .then((response) => response.json())
      .then((responseJson) => console.log(responseJson))
      .catch((error) => console.log(error));
  }

  render() {
    return <Header headerText="专辑" />
  }
}

// 3. 渲染Component
AppRegistry.registerComponent("albums", () => App);