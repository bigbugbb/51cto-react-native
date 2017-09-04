import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({label, value, placeholder, onChangeText, secureTextEntry}) => {
  const { viewStyle, textStyle, textInputStype } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{label}</Text>
      <TextInput 
        style={textInputStype}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        underlineColorAndroid='transparent' />
    </View>
  )
}

const styles = {
  viewStyle: {
    flex: 1,
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 16,
    flex: 1
  },
  textInputStype: {
    fontSize: 16,
    flex: 2,
    height: 20,
    padding: 0
  }
}

export default Input;
