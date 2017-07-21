import React from 'react';
import { View, Text, Image, Linking } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetail = ({album}) => {
  const { image, thumbnail, title, description, link } = album;
  const { 
    imageContainerStyle,
    imageStyle,
    thumbnailStyle,
    infoStyle,
    titleStyle,
    descriptionStyle,
    buttonContainerStyle
  } = styles;
  
  return (
    <Card>
      <CardSection style={imageContainerStyle}>
        <Image source={{uri: image}} style={imageStyle} />
      </CardSection>

      <CardSection>
        <Image source={{uri: thumbnail}} style={thumbnailStyle} />
        <View style={infoStyle}>
          <Text style={titleStyle}>{title}</Text>
          <Text style={descriptionStyle}>{description}</Text>
        </View>
      </CardSection>

      <CardSection style={buttonContainerStyle}>
        <Button onPress={() => Linking.openURL(link)}>
          购买
        </Button>
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
  },
  buttonContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default AlbumDetail;