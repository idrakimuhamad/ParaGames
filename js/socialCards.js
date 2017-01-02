import React, { Component, View, Text, Image, StyleSheet } from 'react-native';
import Dimensions from 'Dimensions';
import socialImage from '../Resources/social.jpg';
import socialImageAvatar from '../Resources/avatar.png';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, .25)',
    overflow: 'hidden',
    borderRadius: 2
  },
  image: {
    width: width,
    height: 250
  },
  flex: {
    flex: 1,
    flexDirection: 'row'
  },
  posterDetails: {
    padding: 16
  },
  socialImageSrc: {
    width: 48,
    height: 48,
    backgroundColor: '#ddd',
    borderRadius: 24
  },
  posterName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginLeft: 12
  },
  postContainer: {
    padding: 16,
    flexDirection: 'column'
  },
  postText: {
    fontSize: 14
  },
  hr: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'rgba(0, 0, 0, .25)'
  }
});

class SocialCard extends Component {
  renderCards() {
    let cards = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 }
    ];
    return cards.map(card => (
      <View style={styles.card} key={card.id}>
       <Image
            style={styles.image}
            source={socialImage}
          />
          <View style={[styles.flex, styles.posterDetails]}>
            <Image
              style={styles.socialImageSrc}
              source={socialImageAvatar}/>
            <Text style={styles.posterName}>mrms</Text>
          </View>
          <View style={[styles.flex, styles.postContainer]}>
            <Text style={styles.postText}>
              A React component for displaying different types of images, including network images, static resources, temporary local images, and images from local disk, such as the camera roll.
            </Text>
          </View>
          <View style={styles.hr}></View>
          <View style={[styles.flex, styles.postContainer]}>
            <Text style={styles.time}>8 Hours Ago</Text>
          </View>
      </View>
    ));
  }
  render() {
    return (
      <View style={styles.cardContainer}>{this.renderCards()}</View>
    );
  }
}

export default SocialCard;
