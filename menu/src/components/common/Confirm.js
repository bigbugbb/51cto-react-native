import React from 'react';
import { View, Text, Modal } from 'react-native';
import Space from './Space';
import Button from './Button';
import Card from './Card';
import CardSection from './CardSection';

const Confirm = ({ children, visible, onAccept, onCancel }) => {  
  const { containerStyle, textContainerStyle, buttonContainerStyle, textStyle } = styles;

  return (
    <Modal
      animationType='fade'
      transparent
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={textContainerStyle}>
          <Text style={textStyle}>
            {children}
          </Text>
        </CardSection>

        <CardSection style={buttonContainerStyle}>
          <Button onPress={onAccept}>确认</Button>
          <Space width={16} />
          <Button onPress={onCancel}>取消</Button>
        </CardSection>
      </View>
    </Modal>
  )
}

const styles = {
  textContainerStyle: {
    justifyContent: 'center',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  buttonContainerStyle: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    borderBottomWidth: 0
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    padding: 32
  }
}

export default Confirm;