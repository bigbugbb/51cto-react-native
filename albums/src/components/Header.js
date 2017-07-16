// 1. 导入React以及相关的库
import React from 'react';
import { Text } from 'react-native';

// 2. 创建Header component
const Header = () => {
  const { textStyle } = styles;

  return <Text style={textStyle}>专辑</Text>
}

const styles = {
  textStyle: {
    fontSize: 20
  }
}

// 3. 导出Header component
export default Header;