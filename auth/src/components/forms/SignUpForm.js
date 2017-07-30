import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../../commons';
import { styles } from './styles';

class SignUpForm extends Component {
  state = { email: '', password: '', passwordRepeat: '' }

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

        <CardSection>
          <View style={viewStyle}>
            <Button>注册</Button>
          </View>
        </CardSection>
      </Card>
    )
  }
}

export { SignUpForm };