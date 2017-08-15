import React, { Component } from 'react';
import { Text } from 'react-native';
import { CardSection } from './common';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {  
  render() {
    console.log(this.props);
    const { titleStyle } = styles;
    return (
      <CardSection>
        <Text style={titleStyle}>
          {this.props.tech.title}
        </Text>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18
  }
}

export default connect(null, actions)(ListItem);