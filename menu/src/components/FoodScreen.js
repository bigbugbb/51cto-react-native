import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight, Dimensions } from 'react-native';
import { Input, Card, CardSection, Button, Confirm } from './common';
import { connect } from 'react-redux';
import { foodNameChanged, foodPriceChanged, initFood, saveFood, deleteFood } from '../actions';

const { width } = Dimensions.get('window');

class FoodScreen extends Component {
  static navigationOptions = {
    title: '菜'
  }

  state = { showDeleteConfirm: false };

  componentWillMount() {
    const { selectedItem } = this.props;
    if (selectedItem) {
      this.props.initFood(selectedItem.food);
    }
  }

  getImageSource(imageUrl) {
    if (imageUrl) {
      return { uri: imageUrl };
    }
    return require('../../img/image-placeholder.jpg');
  }

  onNameChanged(text) {
    this.props.foodNameChanged(text);
  }

  onPriceChanged(text) {
    this.props.foodPriceChanged(text);
  }

  onFoodSave() {
    const { selectedItem, food, navigation } = this.props;
    this.props.saveFood(
      selectedItem ? selectedItem.key : null,
      food,
      navigation
    );
  }

  onFoodDeleteConfirmed() {
    const { selectedItem, navigation } = this.props;
    if (selectedItem.key) {
      this.props.deleteFood(selectedItem.key, navigation);
    }
    this.setState({ showDeleteConfirm: false });
  }

  onFoodDeleteCanceled() {
    this.setState({ showDeleteConfirm: false });
  }

  renderDeleteButton() {
    const { selectedItem } = this.props;
    if (selectedItem && selectedItem.key) {
      return (
        <CardSection>
          <Button onPress={() => this.setState({ showDeleteConfirm: true })}>删除</Button>
        </CardSection>
      );
    }
  }

  render() {
    const { name, imageUrl, price } = this.props.food;
    return (
      <Card>
        <CardSection>
          <Input
            label="菜名"
            placeholder="请输入菜名"
            value={name}
            onChangeText={this.onNameChanged.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Text style={{ flex: 1, fontSize: 16 }}>图片</Text>
          <TouchableHighlight style={{ flex: 2 }}>
            <Image
              source={this.getImageSource(imageUrl)}
              style={{ width: width * 0.5, height: width * 0.5 }}
            />
          </TouchableHighlight>
        </CardSection>

        <CardSection>
          <Input
            label="价格"
            placeholder="请输入价格(元)"
            keyboardType="numeric"
            value={price}
            onChangeText={this.onPriceChanged.bind(this)}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onFoodSave.bind(this)}>保存</Button>
        </CardSection>

        {this.renderDeleteButton()}

        <Confirm
          visible={this.state.showDeleteConfirm}
          onAccept={this.onFoodDeleteConfirmed.bind(this)}
          onCancel={this.onFoodDeleteCanceled.bind(this)}
        >
          您真的要删除这道菜吗？
        </Confirm>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { params } = ownProps.navigation.state;
  return { food: state.food, selectedItem: params ? params.selectedItem : null };
}

export default connect(mapStateToProps, { foodNameChanged, foodPriceChanged, initFood, saveFood, deleteFood })(FoodScreen);