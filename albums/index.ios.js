// 1. 导入React和React Native
import React from 'react';
import { AppRegistry } from 'react-native';
import Header from './src/components/Header';

// 2. 创建我们的Component
const App = () => <Header />

// 3. 渲染Component
AppRegistry.registerComponent("albums", () => App);