import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import AlbumDetail from './AlbumDetail';

class AlbumList extends Component {
  state = { albums: [] };

  componentWillMount() {
    fetch('http://albums-app-dat.oss-cn-hangzhou.aliyuncs.com/albums.json')
      .then((response) => response.json())
      .then((responseJson) => this.setState({ albums: responseJson }))
      .catch((error) => console.log(error));
  }

  renderDetails() {
    return this.state.albums.map((album) => <AlbumDetail key={album.title} album={album}/>);
  }

  render() {
    console.log(this.state);
    return (
      <ScrollView>
        {this.renderDetails()}
        <View style={{paddingBottom: 8}} />
      </ScrollView>
    )
  }

}

export default AlbumList;