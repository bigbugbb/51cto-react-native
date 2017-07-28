import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from '../commons';
import { SignInForm, SignUpForm, SignOutForm } from './forms';

var wilddog = require('wilddog');

const Mode = {
  SIGN_IN: Symbol('SIGN_IN'),
  SIGN_UP: Symbol('SIGN_UP'),
  SIGN_OUT: Symbol('SIGN_OUT')
}

class App extends Component {
  state = { mode: Mode.SIGN_IN }

  componentWillMount() {
    wilddog.initializeApp({
      authDomain: "wd6443597909ohnbgf.wilddog.com"
    });
  }

  toggleSignInAndSignUp() {
    if (this.state.mode === Mode.SIGN_IN) {
      this.setState({ mode: Mode.SIGN_UP });
    } else {
      this.setState({ mode: Mode.SIGN_IN });
    }
  }

  renderContent() { 
    switch (this.state.mode) {
      case Mode.SIGN_IN:
        return <SignInForm />;
      case Mode.SIGN_UP:
        return <SignUpForm />;
      case Mode.SIGN_OUT:
        return <SignOutForm />;
    }
  }

  renderSwitchButton() {
    if (this.state.mode !== Mode.SIGN_OUT) {
      const { viewStyle, buttonStyle, textStyle } = styles;
      return (
        <View style={viewStyle}>
          <TouchableOpacity style={buttonStyle}
                          onPress={this.toggleSignInAndSignUp.bind(this)}>
            <Text style={textStyle}>
              { this.state.mode === Mode.SIGN_IN ? "新用户注册" : "使用已有账号登陆" }
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return (
      <View>
        <Header headerText="用户认证" />
        { this.renderContent() }
        { this.renderSwitchButton() }
      </View>
    )
  }
}

const styles = {
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  buttonStyle: {
    padding: 16
  },
  textStyle: {
    fontSize: 13,
    color: '#007AFF',
    marginLeft: 16,
    marginRight: 16
  }
}

export default App;