import React, { Component } from 'react';
import { Modal, View, ListView, Image, TouchableHighlight } from 'react-native';
import { Header, CardSection, Button } from './common';

class ImagePicker extends Component {
  componentWillMount() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.dataSource = ds.cloneWithRows(this.props.images);
  }

  renderRow(item) {
    return <View />;
  }

  render() {
    const { visible } = this.props;
    
    return (
      <Modal
        animationType='slide'
        visible={visible}
        onRequestClose={() => {}}
      >
        <View>
          <Header headerText='选择图片' />

          <ListView
            dataSource={this.dataSource}
            renderRow={this.renderRow.bind(this)}
          />

          <CardSection>
            <Button>关闭</Button>
          </CardSection>
        </View>
      </Modal>
    );
  }
}

export default ImagePicker;