import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { CardSection } from './common';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {  
  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.tech;

    console.log(this.props);

    return (
      <TouchableWithoutFeedback
        onPress={() => this.props.selectTech(id)}
      >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18
  }
}

const mapStateToProps = (state) => {
  return { selectTechId: state.selectTechId };
}

export default connect(mapStateToProps, actions)(ListItem);