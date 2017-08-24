import React, { Component } from 'react';
import { View, Text } from 'react-native';

class FoodScreen extends Component {
  static navigationOptions = {
    title: '菜'
  }

  render() {
    return (
      <View>
        <Text>
          Food Page
        </Text>
      </View>
    )
  }
}

export default FoodScreen;