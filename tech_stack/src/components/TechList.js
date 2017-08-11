import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

class TechList extends Component {
  render() {
    console.log(this.props);
    return <View />
  }
}

const mapStateToProps = state => {
  return { techs: state.techs };
}

export default connect(mapStateToProps)(TechList);