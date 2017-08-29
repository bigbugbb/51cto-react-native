import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, placeholder, onChangeText, keyboardType, secureTextEntry }) => {
  const { viewStyle, textStyle, textInputStype } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{label}</Text>
      <TextInput 
        style={textInputStype}
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        autoCorrect={false} />
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
    height: 20
  }
}

export default Input;
