import React, { Component } from 'react';
import { 
    Text,
    View , 
    StyleSheet ,
    Dimensions ,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    FlatList,
    Image,
    } from 'react-native';
import {setIcons} from '../utils/setIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as theme from '../utils/theme';
import SplashScreen from 'react-native-splash-screen'


const { width, height } = Dimensions.get('window');

//stylesheet
const styles = StyleSheet.create({
  //Default styling
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  center:{
    alignItems: 'center',
  },

  // Header styling
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  
  //location Container 
  locationContainer: {
    flexDirection:'row',
    width: width - (theme.sizes.padding*2),
    height: width * 0.35, 
    marginHorizontal: theme.sizes.margin,
    borderRadius: theme.sizes.radius,
    backgroundColor:'rgb(242, 246, 248)',
    marginVertical:14
  },
  location: {
    flex:1,
    paddingHorizontal: theme.sizes.padding*0.3,
    paddingVertical: theme.sizes.padding * 0.2,
    marginHorizontal: 2,
  },
  weather:{
    flex:1,
    marginHorizontal: 2,  
  },

  // angkor wat tourist attraction
  destinationContainer: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    padding:24,
    borderRadius: theme.sizes.radius,
    backgroundColor:'rgb(242, 246, 248)',
  },

  // angkor wat Discoverable items 
  discovered: {
  },
  discoverItemHeader: {
      overflow: 'hidden',
      borderTopRightRadius: theme.sizes.radius,
      borderTopLeftRadius: theme.sizes.radius,
  },
  discoverItem: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
    borderRadius: theme.sizes.radius,
    marginVertical: theme.sizes.margin * 0.5,
    marginTop:2
  },
  discoverHeader: {
    overflow: 'hidden',
    borderTopRightRadius: theme.sizes.radius,
    borderTopLeftRadius: theme.sizes.radius,
    marginHorizontal: theme.sizes.margin,
    width: width - (theme.sizes.padding*2),
    padding:5,

  },
  discoverImage: {
    width: (width - (theme.sizes.padding * 2)) / 2,
    height: (width - (theme.sizes.padding * 2)) / 2,
  },


  //avatar for login - user
  avatar: {
    width: theme.sizes.padding*1.5,
    height: theme.sizes.padding*1.5,
    borderRadius: theme.sizes.padding / 2,
    borderColor:'rgb(242, 246, 248)',
  },

  //map container
  mapContainer: {
      width: width - (theme.sizes.padding * 2),
      height: width * 0.6,
      marginHorizontal: theme.sizes.margin,
      padding:24,
      borderRadius: theme.sizes.radius,
      backgroundColor:'rgb(242, 246, 248)',
      marginVertical:18
    },

    //footer
    footer:{
      backgroundColor:'rgb(31, 34, 36)',
      alignItems: 'center', 
      padding:15 
    },

    //container title and subtitle
    containerTitle:{
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      fontSize:12,
      color:theme.colors.white,
      fontSize:24,
      fontWeight:'bold'
    },
    containerSubtitle:{
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      fontSize:12,
      color:theme.colors.white
    },
 
});




//discoverable items
const category = [
  {
    id: 1,
    title: 'Culture',
    preview:require('../Assets/Image/CulturePreview.jpg'),
    caption:'resides in the heart of people',
    description1:' The culture of Cambodia has been heavily influenced by the religions of the people living in the country. The culture has developed from the amalgamation of the Hindu, Buddhist, and indigenous cultures that are prevalent in the region.The Khmer people are modest, and tend to dress conservatively avoiding revealing clothes.',
    description2:'Buddhism has existed in Cambodia since at least the 5th century CE Theravada Buddhism has been the Cambodian state religion since the 13th century CE (excepting the Khmer Rouge period), and is currently estimated to be the faith of 90% of the population. Buddhist nun and monks can be found at Angkor Wat, Siem Reap, Cambodia. It is the official religion in all of Cambodia.',
    contentHeight:1020
  },
  {
    id: 2,
    title: 'History',
    preview: require('../Assets/Image/HistoryPreview.jpg'),
    caption:'intro to Khmer civilisation',
    description:'',
    contentHeight:950
  },
  {
    id: 3,
    title: 'Sights',
    preview: require('../Assets/Image/SightPreview.jpg'),
    caption:'venture to this magic kingdom',
    description:'There are two round tours in Angkor , each of them usually a full-day excursion. They are called  "Small Circuit" and "Grand Circuit". Most Angkor monuments of touristic interest are located along one of these circuits .',
    contentHeight:800
  },
  {
    id: 4,
    title: 'Before you go',
    preview:require('../Assets/Image/BeforeYouGoPreview.jpg'),
    caption:'the ultimate guide list before you go',
    description:''
  },
]

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        temperature: 'disconnect',
        weatherCondition:'',
        icon:"cloud-question",

    };
  }

  componentDidMount(){

    //fetch weather data api
    fetch( 'http://api.openweathermap.org/data/2.5/weather?q=Siemreab,KH&APPID=bff7845d8ecf9dbc4e15a7698a46a05f&units=metric')
    .then(response => response.json())
    .then((responseJson)=> {
  
      this.setState({
        temperature:responseJson['main'].temp +'\xB0C' ,
        weatherCondition:responseJson[  'weather'][0].description,
        icon: setIcons(responseJson['weather'][0].id),
      })
    })

    //hide the splash screen
    this._interval = setInterval(() => {
      SplashScreen.hide();
    }, 1000);

  }


// parent render with scrollview function component
  render() { 
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flex:0}}
      >
        {this.renderHeader()}
        {this.renderWeather()}
        {this.renderDestination()}
        {this.renderDiscovered()}
        {this.renderMap()}
        {this.renderFooter()}
      </ScrollView>
    )
  }

//child render component

//reader header
renderHeader(){
  return(     
  <View style={[styles.flex, styles.row, styles.header]}>
    <View>
       <Text style={{fontSize:18,fontWeight:'500',padding:2}}> Welcome to TravelAngkor</Text>
    </View>
    <View>
      <Image style={[styles.avatar]} source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg'}} />
    </View>
  </View>)
}
// render the content of weather and location
  renderWeather() {
    const { isLoading } = this.state;
    return (

        <View style={[styles.locationContainer, styles.shadow]}>
          <View style={styles.location}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>Angkor</Text>
            <Text style={{fontSize:12}}>Siem Reap , Cambodia</Text>
          </View> 
          <View
              style={{
                borderLeftColor: 'white',
                borderLeftWidth: 3,
                borderLeftHeight: 1,
                borderRadius:15,
                margin:2
              }}
          />
          <View style={[styles.weather , styles.center]}> 
              {<MaterialCommunityIcons size={65} name={this.state.icon} color='lightgrey'/>}  
              <Text style = {{fontSize:15,fontWeight:'bold'}}>{this.state.temperature}</Text>
              <Text style = {{fontSize:12,color:theme.colors.caption}}>{this.state.weatherCondition}</Text>
          </View> 
        </View> 
        )
  }

 // render the content of basic information of Angkor Wat
  renderDestination() {
    return ( 
      <View>
        <Text style={{fontSize: theme.sizes.font*1.5 , fontWeight:'bold', marginHorizontal: theme.sizes.margin, padding:5, marginVertical:5}}>Discover Now</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Welcome')}>
              <ImageBackground   
              style={[styles.flex, styles.destinationContainer, styles.shadow]}
              imageStyle={{ borderRadius: theme.sizes.radius }}
              source={require('../Assets/Image/Angkor.jpg')}>
                <View>
                    <Text style={styles.containerTitle}>Welcome to Angkor </Text>
                    <Text style={styles.containerSubtitle}>Awe Inspiring Temples</Text>
                </View> 
              </ImageBackground>
            </TouchableOpacity>
      </View>
    )
  }

  // render discoverable content
  renderDiscovered = () => {
    return (
      <View style={[styles.discovered]}>
        <View style={[styles.discoverHeader,styles.row]}>
          <Text style={{fontSize: theme.sizes.font * 1.5, fontWeight:'bold' , flex:1 ,marginTop:6,padding:5 }}>Discover More</Text>
        </View>
        <View style={[styles.column]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[ styles.shadow, { overflow: 'visible' }]}
            data={this.props.contents}
            keyExtractor={(item,index) => `${item.id}`}
            renderItem={({ item, index }) => this.renderDiscoverItems(item, index)}
          />
        </View>
      </View>
    )
  }

  //render discoverable items
  renderDiscoverItems = (item, index) => {
    const { contents} = this.props;
    const isLastItem = index === contents.length - 1;
    return (
    
      <TouchableOpacity activeOpacity={0.8}  onPress={() => this.props.navigation.navigate(('Discover'), { discoverItem: item })}>
      <View style={[
        styles.flex, styles.column, styles.discoverItem, styles.shadow, 
        index === 0 ? { marginLeft: theme.sizes.margin } : null,
        isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
      ]}>
          <View style={[styles.flex, styles.discoverItemHeader]}  >
            <Image  style={[styles.discoverImage]}  source = {item.preview}/>
          </View>
          <View style={[styles.flex, styles.column, styles.shadow, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 }]}>
            <Text style={{ fontSize: 16, fontWeight: '500', paddingBottom: 5, }}>{item.title}</Text>
            <Text style = {{fontSize:12,color:theme.colors.caption}}>{item.caption}</Text>
          </View>
      </View>
      </TouchableOpacity>
    
    )
  }

 // render the content of angkor's map
 renderMap() {
  return ( 
  <View>
    <Text style={{fontSize: theme.sizes.font*1.5 , fontWeight:'bold', marginHorizontal: theme.sizes.margin}}>Be your own Guide</Text>
     <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Map')}>
      <ImageBackground   
      style={[styles.mapContainer, styles.shadow]}
      imageStyle={{ borderRadius: theme.sizes.radius }}
      source={require('../Assets/Image/MapPreview.jpg')}>
        <View>
            <Text style={styles.containerTitle}>Map of Angkor </Text>
            <Text style={styles.containerSubtitle}>Walking through the largest architectural masterpiece</Text>
        </View> 

      </ImageBackground>
      </TouchableOpacity>

  </View>
    
  )
}


// render footer
renderFooter(){
  return(
    <View style={styles.footer}>
      <Text style={{color:theme.colors.white,fontSize:10}}>TravelAngkor &#174; Version 1.6</Text> 
    </View>
  )
}
}
HomeScreen.defaultProps = {
  contents: category
};
