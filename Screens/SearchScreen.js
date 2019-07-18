import React, { Component } from 'react';
import {View,TouchableOpacity,FlatList,ActivityIndicator} from 'react-native';
import { Searchbar,Card } from 'react-native-paper';
import * as theme from '../utils/theme';
import * as Animatable from 'react-native-animatable';
import firebase from 'react-native-firebase';

export default class SearchScreen extends Component {

  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.type = navigation.getParam('type');


    this.sightholder = null;

    this.state = {
      isLoading: true,
      isFocus:false,
      firstQuery:"",
      aSight: []
    };

  }

  async componentDidMount() {
    // temp array
    const sights = [];

    // reading data from cloud firestore
    await firebase.firestore().collection('sights')
    .where("type", "==", this.type).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        sights.push(doc.data());
      });
    })
    .then(() => {
      this.sightholder = sights;
      this.setState({
        aSight: sights.sort(function(a, b){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
          //sort alphabetically
        }),
        loading: false
      })
    })
    .catch(function(error) { // handle error
      console.log('There has been a problem with your fetch operation: ' + error.message);
    });

    console.log(sights);// can be removed
  }

  //search filter function
  searchFilterFunction = text => {    
    const newSight = this.sightholder.filter(item => {      
      const itemData = `${item.id} ${item.title} ${item.preview} ${item.subtitle}`;
        const textData = text;
        
        return itemData.indexOf(textData) > -1;    
    });
    
    this.setState({ aSight: newSight });  
  };

  render() {
    if (this.state.loading) {
      return (
        <ActivityIndicator />
      );
    }

    const { firstQuery } = this.state;// excess? *************
   
    return (
        <View style ={{flex:1}}>

        <Animatable.View animation= {this.state.isFocus ? "rubberBand":""}>
          <Searchbar 
            style = {theme.styling.searchbarContainer}
            placeholder="Search for sights"
            onChangeText={firstQuery => this.searchFilterFunction(firstQuery)}
            onFocus = {() => this.setState({ 'isFocus': true})}
            onEndEditing = {() => this.setState({'isFocus': false})}
            > </Searchbar>
        </Animatable.View>

        <FlatList 
        data={this.state.aSight}    
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => ( 
         
         <TouchableOpacity  activeOpacity={0.8} onPress={() => this.props.navigation.navigate(('Sight'), { sight: item })}> 
            <Card style ={theme.styling.sightCardContainer} elevation={2}>
            <Card.Cover style = {theme.styling.sightImageCardContainer} source ={{uri: item.preview}}/>
            <Card.Title title={item.title} subtitle= {item.subtitle}/>
            </Card>
        </TouchableOpacity>

        )}          
            keyExtractor={item => String(item.id)}  
            ItemSeparatorComponent={this.renderSeparator} 
            ListHeaderComponent={this.renderHeader} 
                          
        />       
        </View>
    );
  }
}