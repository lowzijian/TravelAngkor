import React, { Component } from 'react';
import {StyleSheet,View,TouchableOpacity,FlatList} from 'react-native';
import { Searchbar,Card } from 'react-native-paper';
import * as theme from '../utils/theme';
import * as Animatable from 'react-native-animatable';



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
        subtitle:'The Smiling Faces You Cannot Miss',
        description:'The geographical and spiritual center of the ancient city of Angkor Thom, Bayon Temple is one of the crowning artistic achievements of the Khmer king Jayavarman VII. Around 200 giant faces look down from around 50 towers.',
        preview: require('../Assets/Image/BayonPreview.jpg'),
      },
      {
        id: 2,
        title: 'Beng Mealea',
        subtitle:' The Indiana jones jungle temple',
        description:'',
        preview: require('../Assets/Image/BengMealeaPreview.jpg'),
      },
      {
        id: 3,
        title: 'Ta Prohm',
        subtitle:'Tomb Raider Temple',
        description:'Ta Prohm is ubiquitously known as “the Tomb Raider temple.” A 12th-century Buddhist monastery and temple complex enmeshed in a web of towering tree roots, it’s one of Angkor’s—and Cambodia’s—signature sights and stands as an eerie symbol of the transience of human endeavor.',
        preview: require('../Assets/Image/TaProhmPreview.jpg'),
      },
      {
        id: 4,
        title: 'Angkor Wat',
        subtitle:'City of temples',
        description:'Angkor Wat temple complex is a 12th-century engineering marvel that tops many adventure travelers’ bucket lists and justifies a trip to Southeast Asia all on its own. Every surface is covered in intricate carvings and details—nymphs dance on columns in shadowy hallways, serpent-topped balustrades line the moat, and huge, chiseled bas-reliefs wrap the outer walls, depicting Khmer Empire battles.',
        preview: require('../Assets/Image/AngkorPreview.jpg'),
      }   
]

this.state = {
    ísFocus:false,
    firstQuery:"",
    aSight:this.sights.sort(function(a, b){
      if(a.title < b.title) { return -1; }
      if(a.title > b.title) { return 1; }
      return 0;
      //sort alphabetically
  }),
 

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
  //(this.state.isFocus)?bounceInDown:bounceInUp>

  render() {
    const { firstQuery } = this.state;
   
    return (
        <View style ={{flex:1}}>

        <Animatable.View animation= "pulse" duration={2000} iterationCount={2} >
          <Searchbar 
            style = {styles.searchContainer}
            placeholder="Search for sights"
            onChangeText={firstQuery => this.searchFilterFunction(firstQuery)}
            onFocus = {() => this.setState({'isFocus': true})}
            onEndEditing = {() => this.setState({'isFocus': false})}
            > </Searchbar>

        </Animatable.View>

        <FlatList 
        data={this.state.aSight}    
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => ( 
         
         <TouchableOpacity  activeOpacity={0.8} onPress={() => this.props.navigation.navigate(('Sight'), { sight: item })}> 
            <Card style ={styles.cardContainer} elevation={2}>
            <Card.Cover style = {styles.imageContainer} source ={item.preview}/>
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