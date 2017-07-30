import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../../commons';
import { styles } from './styles';

var wilddog = require('wilddog');

class SignUpForm extends Component {
  state = { email: '', password: '', passwordRepeat: '', error: '' }

  onSignUp() {
    const { email, password, passwordRepeat } = this.state;
    if (password !== passwordRepeat) {
      this.setState({ error: "password and passwordRepeat are different" });
    } else {
      wilddog.auth().createUserWithEmailAndPassword(email, password)
        .then((user) => {
          console.info("user created", user);
        })
        .catch((error) => {
          this.setState({ error: error.message });
        })
    }
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
    return (
      <Card>
        <CardSection>
          <Input 
            label="邮箱"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
            placeholder="user@icloud.com"
          />
        </CardSection>

        <CardSection>
          <Input 
            label="密码"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder="请输入密码"
            secureTextEntry={true}
          />
        </CardSection>

        <CardSection>
          <Input 
            label="重复密码"
            value={this.state.passwordRepeat}
            onChangeText={(passwordRepeat) => this.setState({ passwordRepeat })}
            placeholder="请再次输入密码"
            secureTextEntry={true}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          <View style={viewStyle}>
            <Button onPress={this.onSignUp.bind(this)}>注册</Button>
          </View>
        </CardSection>
      </Card>
    )
  }
}

export { SignUpForm };