import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={[style.containerStyle, props.style]}>
      {props.children}
    </View>
  );
}

const style = {
  containerStyle: {
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
    padding: 16,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
}

export default CardSection;