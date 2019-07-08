import React, { Component } from 'react';
import {StyleSheet,View,TouchableOpacity,FlatList} from 'react-native';
import { Searchbar,Card } from 'react-native-paper';
import * as theme from '../utils/theme';


//stylesheet
const styles = StyleSheet.create({
    searchContainer:{
       margin:theme.sizes.margin-15,
    },
    cardContainer:{
        margin:theme.sizes.margin-10,
        borderRadius:theme.sizes.radius,
    },
    imageContainer:{
        height:115,
        resizeMode: 'contain',
    }





})

export default class SearchScreen extends Component {


constructor(props) {
    super(props);

this.sights= [
     {
        id: 1,
        title: 'Bayon',
        subtitle:'It is  bayon',
        preview: require('../Assets/Image/BayonPreview.jpg'),
      },
      {
        id: 2,
        title: 'Beng Mealea',
        subtitle:'It is Beng Mealea',
        preview: require('../Assets/Image/BengMealeaPreview.jpg'),
      },
      {
        id: 3,
        title: 'Ta Prohm',
        subtitle:'It is Ta Prohm',
        preview: require('../Assets/Image/TaProhmPreview.jpg'),
      },
      {
        id: 4,
        title: 'Angkor Wat',
        subtitle:'It is Angkor Wat',
        preview: require('../Assets/Image/AngkorPreview.jpg'),
      }   
]

this.state = {
    firstQuery:"",
    aSight:this.sights,
 

};
this.sightholder = this.sights;
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
    const { firstQuery } = this.state;
   
    return (
        <View style ={{flex:1}}>
        
            <Searchbar 
            style = {[styles.searchContainer]}
            placeholder="Search for sights"
            onChangeText={firstQuery => this.searchFilterFunction(firstQuery) }
            />

        <FlatList 
        data={this.state.aSight}    
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => ( 
         <TouchableOpacity  activeOpacity={0.8}> 
            <Card style ={styles.cardContainer} elevation={2}>
            <Card.Cover style = {styles.imageContainer} source ={`${item.preview}`}/>
            <Card.Title title={`${item.title} `} subtitle= {`${item.subtitle} `}/>
            </Card>
        </TouchableOpacity>

        )}          
            keyExtractor={item => item.id}  
            ItemSeparatorComponent={this.renderSeparator} 
            ListHeaderComponent={this.renderHeader} 
                          
        />       
        </View>
    );
  
  }
}