import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../../commons';

class SignInForm extends Component {
  state = { email: '', password: '' }
  
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
          <View style={viewStyle}>
            <Button>登陆</Button> 
          </View>       
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  viewStyle: {
    flex: 1
  }
}

export { SignInForm };