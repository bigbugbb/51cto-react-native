import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import { Image } from 'react-native';

const AlbumDetail = ({album}) => {
  const { image, thumbnail, title, description } = album;
  const { 
    imageContainerStyle,
    imageStyle,
    thumbnailStyle,
    infoStyle,
    titleStyle,
    descriptionStyle
  } = styles;
  
  return (
    <Card>
      <CardSection style={imageContainerStyle}>
        <Image source={{uri: image}} style={imageStyle}></Image>
      </CardSection>

      <CardSection>
        <Image source={{uri: thumbnail}} style={thumbnailStyle}></Image>
        <View style={infoStyle}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </CardSection>
    </Card>
  );
}

const styles = {
  imageStyle: {
    flex: 1,
    height: 300
  },
  imageContainerStyle: {
    padding: 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden'
  },
  thumbnailStyle: {
    width: 48,
    height: 48,
    borderRadius: 2,
    marginRight: 8
  },
  infoStyle: {
    flex: 1,
    marginBottom: 6
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6
  },
  descriptionStyle: {
    fontSize: 13
  }
}

export default AlbumDetail;