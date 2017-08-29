import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { Card, CardSection } from './common';

class ListItem extends Component {
  selectItem(item) {
    const { navigate } = this.props.navigation;
    navigate('Food', { selectedItem: item });
  }

  render() {
    const { key, food } = this.props.item;
    const { thumbnailStyle, infoStyle, nameStyle, priceStyle } = styles;
    return (
      <TouchableWithoutFeedback onPress={() => this.selectItem({key, food})}>
        <View>
          <Card>
            <CardSection>
              <Image source={{uri: food.imageUrl}} style={thumbnailStyle} />
              <View style={infoStyle} >
                <Text style={nameStyle} >{food.name}</Text>
                <Text style={priceStyle} >{'价格: ' + food.price + '元'}</Text>
              </View>
            </CardSection>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  thumbnailStyle: {
    width: 60,
    height: 60,
    borderRadius: 2,
    marginRight: 16
  },
  infoStyle: {
    flex: 1,
    paddingTop: 4
  }, 
  nameStyle: {
    flex: 2,
    fontSize: 18,
    fontWeight: '600'
  },
  priceStyle: {
    flex: 1,
    fontSize: 14
  }
}

export default ListItem;