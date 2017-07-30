import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Card, CardSection, Input, Button } from '../../commons';
import { styles } from './styles';

var wilddog = require('wilddog');

class SignInForm extends Component {
  state = { authorizing: false, email: '', password: '', error: '' }

  onSignIn() {
    const { email, password } = this.state;

    this.setState({ authorizing: true });
    wilddog.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.info("user login successfully, current user => ", wilddog.auth().currentUser);
      })
      .catch((error) => {
        this.setState({ error: error.message, authorizing: false });
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
  
  renderButton() {
    if (this.state.authorizing) {
      return (
        <ActivityIndicator size='small'/>
      )
    } else {
      return (
        <Button onPress={this.onSignIn.bind(this)}>登陆</Button>
      )
    }
  }

  render() {
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
          <View style={styles.viewStyle}>
            {this.renderButton()}
          </View>       
        </CardSection>
      </Card>
    )
  }
}

export { SignInForm };