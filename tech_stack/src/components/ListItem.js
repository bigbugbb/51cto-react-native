import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  LayoutAnimation,
  UIManager,
  Platform
} from 'react-native';
import { CardSection } from './common';
import * as actions from '../actions';
import { connect } from 'react-redux';

class ListItem extends Component {
  constructor() {
    super();

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription(description) {
    if (this.props.selected) {
      return (
        <CardSection>
          <Text>
            {description}
          </Text>
        </CardSection>
      );
    }
  }

  render() {
    const { titleStyle } = styles;
    const { id, title, description } = this.props.tech;

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
          {this.renderDescription(description)}
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

const mapStateToProps = (state, ownProps) => {
  return { selected: ownProps.tech.id === state.selectTechId };
}

export default connect(mapStateToProps, actions)(ListItem);