import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class MenuListScreen extends Component {
  static navigationOptions = ({navigation, screenProps}) => ({
    title: '菜单',
    headerTitleStyle: {
      alignSelf: 'center'
    },
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('Food')} style={styles.headerButtonStyle}>
        <Text style={[styles.headerTextStyle, {color: screenProps.tintColor}]}>
          +
        </Text>
      </TouchableOpacity>
    )
  });

  render() {
    return (
      <View>
        <Text>
          Menu List
        </Text>
      </View>
    )
  }
}

const styles = {
  headerButtonStyle: {
    marginRight: 16
  },
  headerTextStyle: {
    fontSize: 32,
    color: '#007AFF'
  }
}

export default MenuListScreen;