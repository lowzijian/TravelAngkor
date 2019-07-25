import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import * as theme from '../utils/theme';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { ActivityIndicator } from "react-native-paper";

export default class MapDiscoverScreen extends Component {

  constructor(props) {
    super(props);
    this.toggleVisited = this.toggleVisited.bind(this);
    this.state = {
      isVisited: false,
      loading: true,
      markers: null,
    };

    this.sight = null
    this.sightId = null
  }

  toggleVisited() {
    this.setState({
      isVisited: !this.state.isVisited
    })
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.title = navigation.getParam('title');

    //console.log(this.sightId);
    
    //console.log('Entered!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    /*
    console.log(`sights/${this.sightId}`);
    await firebase.firestore().doc(`sights/${this.sightId}`).get()
    .then(function(doc) {
        this.sight = doc.data();
        console.log(this.sight);
    })
    .then(() => this.setState({loading: false}))
    .catch(function(error) { // handle error
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });
    console.log(this.sight.title);
    */
    const markers_ = [];

    await firebase.firestore().collection('markers').where("title", "==", this.title).get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          markers_.push(doc.data());
        });
    })
    .then(() => this.setState({markers: markers_, loading: false}))
    .catch(function(error) { // handle error
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });

    console.log(this.state.markers[0])
  }

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator />
      );
    }

    return (
    <HeaderImageScrollView
      showsVerticalScrollIndicator={false}
      maxHeight={theme.MAX_HEIGHT}
      minHeight={0}      
      scrollViewBackgroundColor= "transparent"
      renderHeader={() => <Image source={{uri: this.sight ? this.sight.image : this.state.markers[0].image}} style={theme.styling.backgroundImage} />}>
      

        <View style={[theme.styling.contentHeight,{height:500}]}>
            <View style={[theme.styling.contentContainer]}>
                    <Text style={theme.styling.title2}>{this.sight ? this.sight.title : this.state.markers[0].title}</Text>
                    <Text style={theme.styling.caption}>{this.sight ? this.sight.subtitle : this.state.markers[0].subtitle}</Text>
            </View>
              <View style={theme.styling.contentContainer}>
                  <Text style={theme.styling.description}>{this.sight ? this.sight.description : this.state.markers[0].description}</Text>
              </View>
              <View style={[theme.styling.contentContainer,{marginTop:25}]}>
                  <Button  type="outline" title= {this.state.isVisited ? 'Visited' : 'Visit'} buttonStyle = {[{borderColor:"grey", backgroundColor:this.state.isVisited ? 'white' : 'grey',borderRadius:theme.sizes.radius} ,theme.styling.shadow]} titleStyle ={{color:this.state.isVisited ? 'grey' : 'white'}}
                     onPress={() =>{this.toggleVisited()}}/>
              </View>
        </View>

    </HeaderImageScrollView>
    );
  }

 

}

