import React, { Component } from 'react';
import { Modal, View, ListView, Image, TouchableHighlight } from 'react-native';
import { Header, CardSection, Button } from './common';

class ImagePicker extends Component {
  state = { dimensions: { width: 0, height: 0 } };

  componentWillMount() {
    this.updateDataSource();
  }

  componentWillUpdate() {
    this.updateDataSource();
  }

  updateDataSource() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSource = ds.cloneWithRows(this.props.images);
  }

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ dimensions: { width, height } });
  }

  renderRow(item) {
    const { image } = item.node;
    let side = this.state.dimensions.width / 3;

    return (
      <TouchableHighlight
        onPress={() => this.props.onSelectImage(image)}
        style={{ width: side, height: side }}
      >
        <Image
          source={{ uri: image.uri }}
          style={{ width: side, height: side }}
        />
      </TouchableHighlight>
    );
  }

  render() {
    const { visible, onCancel } = this.props;
    const { containerStyle, listViewStyle, buttonContainerStyle } = styles;
    
    return (
      <Modal
        animationType='slide'
        visible={visible}
        onRequestClose={() => {}}
      >
        <View style={containerStyle} onLayout={this.onLayout}>
          <Header headerText='选择图片' />

          <ListView
            contentContainerStyle={listViewStyle}
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
            enableEmptySections
          />

          <CardSection style={buttonContainerStyle}>
            <Button onPress={() => onCancel()}>关闭</Button>
          </CardSection>
        </View>
      </Modal>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1
  },
  listViewStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  buttonContainerStyle: {
    alignSelf: 'flex-end'
  }
}

export default ImagePicker;