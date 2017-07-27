import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header } from '../commons';
import { SignInForm, SignUpForm, SignOutForm } from './forms';

const Mode = {
  SIGN_IN: Symbol('SIGN_IN'),
  SIGN_UP: Symbol('SIGN_UP'),
  SIGN_OUT: Symbol('SIGN_OUT')
}

class App extends Component {
  state = { mode: Mode.SIGN_IN }

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

  render() {
    return (
      <View>
        <Header headerText="用户认证" />
        { this.renderContent() }
      </View>
    )
  }
}

export default App;