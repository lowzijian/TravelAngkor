import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";

import MapView from "react-native-maps";
import firebase from 'react-native-firebase';
import { ActivityIndicator } from "react-native-paper";

/*
const Images = [
  require('../Assets/Image/AngkorWatPreview.jpg'),
  require('../Assets/Image/AngkorWatPreview.jpg'),
  require('../Assets/Image/AngkorWatPreview.jpg'),
  require('../Assets/Image/AngkorWatPreview.jpg'),
  require('../Assets/Image/AngkorWatPreview.jpg'),
]
*/

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT + 80;

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0043 //zoom level
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class screens extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      markers: null,/*[
        {
          coordinate: {
            latitude: 13.412471,
            longitude: 103.866995,
          },
          title: "Angkor Wat",
          description: "This is the best place in Portland",
          image: Images[0],
        },
        {
          coordinate: {
            latitude: 13.412990,
            longitude: 103.867857,
          },
          title: "Vishnu Conquers Demons Gallery",
          description: "This is the second best place in Portland",
          image: Images[1],
        },
        {
          coordinate: {
            latitude: 13.412504,
            longitude: 103.865490,
          },
          title: "Terrace of Honor",
          description: "This is the third best place in Portland",
          image: Images[2],
        },
        {
          coordinate: {
            latitude: 13.413021,
            longitude: 103.865874,
          },
          title: "Battle of Lanka Gallery",
          description: "This is the fourth best place in Portland",
          image: Images[3],
        },
        {
          coordinate: {
            latitude: 13.412495,
            longitude: 103.866410,
          },
          title: "Second Gallery",
          description: "This is the fifth best place in Portland",
          image: Images[4],
        },
      ],*/
      region: {
        latitude: 13.412478,
        longitude: 103.866995,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }

  async componentDidMount() {
    // We should detect when scrolling has stopped then animate
    // We should just debounce the event listener here
    this.animation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= this.state.markers.length) {
        index = this.state.markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          const { coordinate } = this.state.markers[index];
          this.map.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });

    // temp array
    const markers_ = [];

    // reading data from cloud firestore
    await firebase.firestore().collection('markers').get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          markers_.push(doc.data());
        });
    })
    .then(() => this.setState({markers: markers_, loading: false}))
    .catch(function(error) { // handle error
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });

    //console.log(this.state.markers);// can be removed
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator />
      );
    }

    const interpolations = this.state.markers.map((marker, index) => {
      const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index + 1) * CARD_WIDTH),
      ];
      const scale = this.animation.interpolate({
        inputRange,
        outputRange: [1, 1.5, 1],
        extrapolate: "clamp",
      });
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange: [0.35, 1, 0.35],
        extrapolate: "clamp",
      });
      return { scale, opacity };
    });

    return (
      <View style={styles.container}>
        <MapView
          ref={map => this.map = map}
          initialRegion={this.state.region}
          style={styles.container}
        >
          {this.state.markers.map((marker, index) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[index].scale,
                },
              ],
            };
            const opacityStyle = {
              opacity: interpolations[index].opacity,
            };
            return (
              <MapView.Marker
                key={index}
                coordinate={marker.coordinate}
                title={marker.title}
              > 
                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                  <Animated.View style={[styles.ring, scaleStyle]} />
                  <View style={styles.marker} />
                </Animated.View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          decelerationRate={0}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment={'center'}
          keyboardShouldPersistTaps="always"
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
          {this.state.markers.map((marker, index) => (
            <TouchableOpacity
              style={styles.card}
              key={index}
            >
              <Image
                source={{uri: marker.image}}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  {marker.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 5,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH - 80,
    paddingLeft: width - CARD_WIDTH - 80,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 8,
    marginBottom:2,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
    borderRadius:4
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(220,20,60, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(220,20,60, 0.3)",
    borderWidth: 1,
    borderColor: "rgba(220,20,60, 0.5)",
  },
  fab: {
    height: 50,
    width: 50,
    borderRadius: 200,
    position: 'absolute',
    top: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#686cc3',
  }
});