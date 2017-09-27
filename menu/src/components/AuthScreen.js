import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

class AuthScreen extends Component {
  static navigationOptions = {
    title: '用户认证',
    headerTitleStyle: {
      alignSelf: 'center'
    }
  };

  onEmailChanged(text) {
    this.props.emailChanged(text);
  }

  onPasswordChanged(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { auth, navigation } = this.props;
    this.props.loginUser(auth.email, auth.password, navigation);
  }

  renderErrorMessage(error) {
    if (error) {
      return (
        <Text style={styles.errorMessageStyle}>
          {error}
        </Text>
      )
    }
  }

  renderButton() {
    if (this.props.auth.authenticating) {
      return <ActivityIndicator size='small' />;
    }
    return <Button onPress={this.onButtonPress.bind(this)}>登陆</Button>;
  }

  render() {
    const { email, password, error } = this.props.auth;
    return (
      <Card>
        <CardSection>
          <Input 
            label="邮箱"
            placeholder="user@icloud.com"
            value={this.props.auth.email}         
            onChangeText={this.onEmailChanged.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Input 
            label="密码"
            placeholder="请输入密码"
            value={this.props.auth.password}
            onChangeText={this.onPasswordChanged.bind(this)}
            secureTextEntry
          />
        </CardSection>

        {this.renderErrorMessage(error)}

        <CardSection>
          <View style={{flex: 1}}>
            {this.renderButton()}
          </View>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorMessageStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
    paddingTop: 8
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(AuthScreen);