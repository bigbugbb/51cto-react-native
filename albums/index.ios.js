// 1. 导入React和React Native
import React, { Component } from 'react';
import { AppRegistry, View } from 'react-native';
import Header from './src/components/Header';
import AlbumList from './src/components/AlbumList';

// 2. 创建我们的Component
class App extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <Header headerText="专辑" />
        <AlbumList />
      </View>
    )
  }
}

// 3. 渲染Component
AppRegistry.registerComponent("albums", () => App);