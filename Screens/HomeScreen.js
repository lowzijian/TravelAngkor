import React, { Component } from 'react';
import { 
    Text,
    View , 
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
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';





//discoverable items
const category = [
  {
    id: 1,
    title: 'Culture',
    preview:require('../Assets/Image/CulturePreview.jpg'),
    caption:'resides in the heart of people',
    description1:' The culture of Cambodia has been heavily influenced by the religions of the people living in the country. The culture has developed from the amalgamation of the Hindu, Buddhist, and indigenous cultures that are prevalent in the region.The Khmer people are modest, and tend to dress conservatively avoiding revealing clothes.',
    description2:'Buddhism has existed in Cambodia since at least the 5th century CE Theravada Buddhism has been the Cambodian state religion since the 13th century CE (excepting the Khmer Rouge period), and is currently estimated to be the faith of 90% of the population. Buddhist nun and monks can be found at Angkor Wat, Siem Reap, Cambodia. It is the official religion in all of Cambodia.',
  },
  {
    id: 2,
    title: 'History',
    preview: require('../Assets/Image/HistoryPreview.jpg'),
    caption:'intro to Khmer civilisation',
    description:'Angkor Wat is the largest religious monument in the world which translates to “City Temple”. It was originally built in the first half of the 12th century as a Hindu temple during the reign of King Suryavarman II. This was the zenith of cultural, religious and artistic development of the Khmer civilisation. The construction took an estimated 30 years to complete. Angkor Wat is a prime example of the temple-mountain concept. It was constructed in the image of Mount Meru, the sacred mountain in Hindu mythology. The central tower, rising 65 metres above the ground, symbolizes the central peak of Mount Meru and the four supporting towers represent the four surrounding peaks.',
  },
  {
    id: 3,
    title: 'Sights',
    preview: require('../Assets/Image/SightPreview.jpg'),
    caption:'venture to this magic kingdom',
    description:'There are two round tours in Angkor , each of them usually a full-day excursion. They are called  "Small Circuit" and "Grand Circuit". Most Angkor monuments of touristic interest are located along one of these circuits .',
  },
  {
    id: 4,
    title: 'Before you go',
    preview:require('../Assets/Image/BeforeYouGoPreview.jpg'),
    caption:'the ultimate guide list before you go',
    description:'Angkor is  rich in culture, customs and religion. Here are a few tips you should know before packing that will help enhance your trip to the Kingdom of Wonder.',
    details:[
      'Start early, and pack for multiple days of adventure.',
      'Do not throw away your ticket. Multi-day tickets will be checked each time you re-enter the property. Replacing it means waiting in line and probably paying again.',
      'Hire a local tuk-tuk driver instead of a tour operator as drivers know the areas better and can make recommendations on the best time to visit specific temples.',
      'Skip sunrise at the main temple as it is crowded. Drivers may know some secret places that are less people. So, you can enjoy your memorable sunrise experience.',
      'Bringing food and water is a good idea.',
      'Be ready to walk. A lot.',
      'Bring a guidebook, even if traveling with a guide.',
      'Revealing clothes must not be worn - bare shoulders and knees will be viewed as disrespectful. The Royal Palace in Phnom Penh rents unsuitably attired visitors a flattering pair of "one size fits nobody" long trousers for $2.',
      'Do not fall into the trap of buying from or giving to the kids',
      'Do not touch a Buddhist monk’s head', 
    ],
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
    <HeaderImageScrollView
      maxHeight={120}
      minHeight={0}
      foregroundParallaxRatio={2}
      maxOverlayOpacity={0}
      fadeOutForeground
      showsVerticalScrollIndicator={false}
      renderForeground={() => (
        <View style={theme.styling.header}>
        <Text style={{color:theme.colors.white,fontSize:25,fontWeight:"500"}}>TravelAngkor</Text>
        <Text style={{color:theme.colors.white,fontSize:10}}>The Ultimate Angkor Wat Guide : Everything you need </Text>
       </View>
      )}
    >
      <View>
        <TriggeringView>
        {this.renderContent()}
        </TriggeringView>
      </View>
    </HeaderImageScrollView>
    )
  }

  renderContent () {
    return(
      <View>
        {this.renderWeather()}
        {this.renderDestination()}
        {this.renderDiscovered()}
        {this.renderMap()}
        {this.renderFooter()}
      </View>
    )
  }
    
  

//child render component


// render the content of weather and location
  renderWeather() {
    return (

        <View style={[theme.styling.weatherContainer]}>
          <View style={theme.styling.location}>
            <Text style={{fontSize:25,fontWeight:'bold'}}>Angkor</Text>
            <Text style={{fontSize:12}}>Siem Reap , Cambodia</Text>
          </View> 
          <View
            //divider
              style={theme.styling.divider }
          />
          <View style={[theme.styling.weather , theme.styling.center]}> 
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
      <View style={theme.styling.contentContainer}>
        <Text style={theme.styling.title1}>Discover Now</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Welcome')}>
              <ImageBackground   
              style={[theme.styling.flex, theme.styling.DefaultContainer, theme.styling.shadow]}
              imageStyle={{ borderRadius: theme.sizes.radius }}
              source={require('../Assets/Image/Angkor.jpg')}>
                <View>
                    <Text style={theme.styling.containerTitle}>Welcome to Angkor </Text>
                    <Text style={theme.styling.containerSubtitle}>Awe Inspiring Temples</Text>
                </View> 
              </ImageBackground>
            </TouchableOpacity>
      </View>
    )
  }

  // render discoverable content
  renderDiscovered = () => {
    return (
      <View style={[theme.styling.discovered]}>
        <View style={[theme.styling.discoverHeader,theme.styling.row]}>
          <Text style={theme.styling.title1}>Discover More</Text>
        </View>
        <View style={[theme.styling.column]}>
          <FlatList
            horizontal
            pagingEnabled
            scrollEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            snapToAlignment="center"
            style={[ theme.styling.shadow, { overflow: 'visible' }]}
            data={this.props.contents}
            keyExtractor={(item, index) => `${item.id}`}
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
        theme.styling.flex, theme.styling.column, theme.styling.discoverItem, theme.styling.shadow, 
        index === 0 ? { marginLeft: theme.sizes.margin } : null,
        isLastItem ? { marginRight: theme.sizes.margin / 2 } : null,
      ]}>
          <View style={[theme.styling.flex, theme.styling.discoverItemHeader]}  >
            <Image  style={[theme.styling.discoverImage]}  source = {item.preview}/>
          </View>
          <View style={[theme.styling.flex, theme.styling.column, theme.styling.shadow, { justifyContent: 'space-evenly', padding: theme.sizes.padding / 2 }]}>
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
  <View style= {theme.styling.contentContainer}>
    <Text style={theme.styling.title1}>Be your own Guide</Text>
     <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Map')}>
      <ImageBackground   
      style={[theme.styling.DefaultContainer, theme.styling.shadow]}
      imageStyle={{ borderRadius: theme.sizes.radius }}
      source={require('../Assets/Image/MapPreview.jpg')}>
        <View>
            <Text style={theme.styling.containerTitle}>Map of Angkor </Text>
            <Text style={theme.styling.containerSubtitle}>Walking through the largest architectural masterpiece</Text>
        </View> 

      </ImageBackground>
      </TouchableOpacity>

  </View>
    
  )
}


// render footer
renderFooter(){
  return(
    <View style={theme.styling.footer}>
      <Text style={{color:theme.colors.white,fontSize:10}}>TravelAngkor &#174; Version 1.11</Text> 
    </View>
  )
}
}

HomeScreen.defaultProps = {
  contents: category
};
