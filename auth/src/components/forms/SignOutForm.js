import React from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Button } from '../../commons';
import { styles } from './styles';

var wilddog = require('wilddog');

const SignOutForm = () => {
  return (
    <Card>
      <CardSection>
        <View style={styles.viewStyle}>
          <Button onPress={() => wilddog.auth().signOut()}>注销</Button>
        </View>
      </CardSection>
    </Card>
  )
}

export { SignOutForm };