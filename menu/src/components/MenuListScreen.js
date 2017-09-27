import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ListView, ActivityIndicator } from 'react-native';
import ListItem from './ListItem';
import { connect } from 'react-redux';
import { fetchMenuList } from '../actions';

const EMPTY_FOOD = {
  name: '',
  imageUrl: '',
  price: ''
};

class MenuListScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '菜单',
    headerTitleStyle: {
      alignSelf: 'center'
    },
    headerRight: (
      <TouchableOpacity 
        onPress={() => navigation.navigate('Food', { selectedItem: { food: EMPTY_FOOD } })} 
        style={styles.headerButtonStyle}>
        <Text style={[styles.headerTextStyle, {color: screenProps.tintColor}]}>
          +
        </Text>
      </TouchableOpacity>
    )
  });

  componentWillMount() {
    this.props.fetchMenuList();
  }

  dataSource() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(this.props.data);
  }

  renderRow(item) {
    return <ListItem item={item} navigation={this.props.navigation} />
  }

  renderFooter() {
    return <View style={{height: 8}}/>
  }

  render() {
    if (this.props.loading) {
      const { loadingContainerStyle, loadingStyle } = styles;
      return (
        <View style={loadingContainerStyle}>
          <ActivityIndicator style={loadingStyle} size='large' animating={true} />
        </View>
      );
    } else {
      return (
        <ListView        
          dataSource={this.dataSource()}
          renderRow={this.renderRow.bind(this)}
          renderFooter={this.renderFooter}
          enableEmptySections
        />
      );
    }
  }

}

const styles = {
  headerButtonStyle: {
    marginRight: 16
  },
  headerTextStyle: {
    fontSize: 32,
    color: '#007AFF'
  },
  loadingContainerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
    height: 80
  }
}

const mapStateToProps = (state) => {
  const { loading, data } = state.menu_list;
  return { loading, data };
}

export default connect(mapStateToProps, { fetchMenuList })(MenuListScreen);