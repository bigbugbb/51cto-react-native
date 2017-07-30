import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../../commons';
import { styles } from './styles';

var wilddog = require('wilddog');

class SignInForm extends Component {
  state = { email: '', password: '', error: '' }

  onSignIn() {
    const { email, password } = this.state;
    wilddog.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.info("user login successfully, current user => ", wilddog.auth().currentUser);
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  renderError() {
    const { error } = this.state;
    if (error) {
      return (
        <CardSection>
          <Text style={styles.errorStyle}>{error}</Text>
        </CardSection>
      )
    }
  }

  render() {
    const { viewStyle } = styles;
    const { email, password, error } = this.state;
    return (
      <Card>
        <CardSection>
          <Input 
            label="邮箱"
            value={email}
            onChangeText={(email) => this.setState({ email })}
            placeholder="user@icloud.com"
          />
        </CardSection>

        <CardSection>
          <Input
            label="密码"
            value={password}
            onChangeText={(password) => this.setState({ password })} 
            placeholder="请输入密码"
            secureTextEntry={true}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          <View style={viewStyle}>
            <Button onPress={this.onSignIn.bind(this)}>登陆</Button> 
          </View>       
        </CardSection>
      </Card>
    )
  }
}

export { SignInForm };