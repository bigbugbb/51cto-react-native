import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({onPress, children}) => {
  const {buttonStyle, textStyle} = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  )
}

const styles = {
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#007AFF',
    padding: 8
  },
  textStyle: {
    fontSize: 16,
    alignSelf: 'center', 
    color: '#007AFF',
    marginLeft: 16,
    marginRight: 16
  }
}

export default Button;