import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, View , ImageBackground,Image } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import * as theme from '../utils/theme';


const pinpointSight = [
  {
    id: 1,
    title: 'Bayon Temple',
    category:'Grand Circuit'
    },
  {
    id: 2,
    title: 'Ta Prohm',
    category:'Small Circuit'
  },
  {
    id: 3,
    title: 'Angkor Wat',
    category:'Grand Circuit'
  },
  {
    id: 4,
    title: 'Banteay Srei',
    category:'Grand Circuit'
  },
  {
    id: 5,
    title: 'Phnom Bakheng',
    category:'Grand Circuit'
  },
  {
    id: 6,
    title: 'Prasat Suor prat',
    category:'Small Circuit'
  },
  {
    id: 7,
    title: 'Prasat Phnom Bok',
    category:'Grand Circuit'
  },
  {
    id: 8,
    title: 'Preah Ko',
    category:'Grand Circuit'
  },

]

  
  export default class WelcomeScreen extends Component {
    constructor() {
      super();
      this.state = { 
      showNavTitle: false ,
      sight:pinpointSight,
   
    }
  }



_renderItem ({item, index}, parallaxProps) {
  return (
      <View style={{borderRadius:theme.sizes.radius, backgroundColor:'rgb(242, 246, 248)',alignItems:"center", padding:5}}>
          <Text style={{fontSize:15,fontWeight:"500"}}>{item.title}</Text>
          <Text style={theme.styling.caption}>{item.category}</Text>
      </View>
  );
}

  
    render() {
      return (
          <HeaderImageScrollView
            showsVerticalScrollIndicator={false}
            maxHeight={theme.MAX_HEIGHT}
            minHeight={theme.MIN_HEIGHT}
            maxOverlayOpacity={0.6}
            minOverlayOpacity={0.0} 
            scrollViewBackgroundColor= "transparent"
            renderForeground={() => (
                <View style={theme.styling.titleContainer}>
                  <Text style={theme.styling.imageTitle}>Welcome to Angkor</Text>
                </View>
              )}
            renderHeader={() =>(<Image source={require('../Assets/Image/Angkor.jpg')}  style={theme.styling.backgroundImage}/>)}
            renderFixedForeground={() => (
              <Animatable.View
                style={theme.styling.navTitleView} 
                ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <Text style={theme.styling.navTitle}>Welcome to Angkor </Text>
              </Animatable.View>
            )} >


              <TriggeringView
              onHide={() => this.navTitleView.fadeInUp(200)}
              onDisplay={() => this.navTitleView.fadeOut(100)}>
              </TriggeringView>

               <View style={[theme.styling.contentHeight]}>
                  <View style={theme.styling.contentContainer}>
                     <Text style={theme.styling.title2}>About </Text>
                 <Text style={theme.styling.superscript}>Angkor (ប្រាសាទអង្គរ) </Text>    
                <Text style={theme.styling.description}>was the capital of the Khmer empire between the begin of the 10th and the middle of the 15th century. It is a UNESCO world heritage and streches over some 400km&#178; , including forested area and magnificent remains of the different capitals of the Khmer Empire. They include the famous Temple of Angkor Wat and,at Angkor Thom, the Bayon Temple with its countless sculptural decorations</Text>  
                  </View>
                  <View style={theme.styling.contentContainer}>

                     <Text style={theme.styling.title2}>Information   
                     <MaterialCommunityIcons  name="information" color={theme.colors.gray} size={theme.sizes.font * 1.5}></MaterialCommunityIcons>
                     </Text> 

                      <View style={theme.styling.infoContainer}>
                        <Text style={theme.styling.h2}>Opening Hours</Text>  
                        <Text style={theme.styling.description}> 7:30 am - 5:30pm</Text> 
                      </View> 

                      <View style={theme.styling.infoContainer}>
                        <Text style={theme.styling.h2}>Official Website</Text>  
                        <Text style={theme.styling.description}> http://angkor.com.kh/</Text> 
                      </View>  

                       <View style= {[theme.styling.infoContainer]}>
                         <Text style={[theme.styling.h2]}>Entrance Fees</Text> 

                        <View style={theme.styling.feesContainer}>   
                        <Text style={theme.styling.description}>1 day pass ( $37 ) </Text>
                        <Text style={theme.styling.caption}>Valid for one day</Text>
                        </View>

                        <View style={theme.styling.feesContainer}>   
                        <Text style={theme.styling.description}>3 days pass ( $62 ) </Text>
                        <Text style={theme.styling.caption}>The pass can be used for 3 separated days within 1 week</Text>
                        </View>

                        <View style={theme.styling.feesContainer}>   
                        <Text style={theme.styling.description}>7 days pass ( $72 ) </Text>
                        <Text style={theme.styling.caption}>The pass can be used for 7 separated days within 1 month</Text>
                        </View>
                       </View>

                  </View>

                    <View style={[theme.styling.contentContainer,{marginBottom:15}]}>
                        <Text style={theme.styling.title2}>Sights </Text> 
                        <View style = {{alignContent:"center",alignItems:'center'}}>
                          <Carousel
                          layout={'stack'} layoutCardOffset={0} 
                          ref={(c) => { this._carousel = c; }}
                          data={this.state.sight}
                          renderItem={this._renderItem}
                          vertical ={true}
                          itemHeight = {50}
                          sliderHeight={50}
                          loop={true}
                          autoplay={true}
                          lockScrollWhileSnapping={true}
                          autoplayInterval={2000}/>
                      </View>
                  </View>
               </View>
          </HeaderImageScrollView>
      );
    }
  }