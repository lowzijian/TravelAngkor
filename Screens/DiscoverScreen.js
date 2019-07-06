import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from'react-native-vector-icons/FontAwesome'
import FontAwesome5 from'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, View ,StyleSheet,Dimensions,TouchableOpacity , ImageBackground,Image } from 'react-native';
import * as theme from '../utils/theme';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Header  } from 'react-navigation';

const { width, height } = Dimensions.get('window');

const MIN_HEIGHT =Header .HEIGHT+50;
const MAX_HEIGHT =350;
const pinpointSight = [
  {
    id: 1,
    title: 'Bayon',
    preview: require('../Assets/Image/BayonPreview.jpg'),
  },
  {
    id: 2,
    title: 'Beng Mealea',
    preview: require('../Assets/Image/BengMealeaPreview.jpg'),
  },
  {
    id: 3,
    title: 'Ta Prohm',
    preview: require('../Assets/Image/TaProhmPreview.jpg'),
  },
  {
    id: 4,
    title: 'Angkor Wat',
    preview: require('../Assets/Image/AngkorPreview.jpg'),
  }
]

const styles = StyleSheet.create({

  //Default
  flex: {
      flex: 0,
    },
    column: {
      flexDirection: 'column'
    },
    row: {
      flexDirection: 'row'
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

    
    // Titles ,headers, descriptions for the content
    title:{
        fontSize:25,
        fontWeight:'500',
        marginBottom:5,
        marginTop:15
      },  

    header1:{
      fontSize:18,
      fontWeight:'300',
      textDecorationLine:'underline',
    },

    description:{
      fontSize:15,
      fontWeight:'200',
      paddingVertical:3,
    },

    content:{
      marginHorizontal:theme.sizes.margin,
      backgroundColor: 'transparent',
      marginBottom:8
    },

  // styling for the scroll view content
    image: {
      height: MAX_HEIGHT,
      width: width,
      resizeMode: 'cover',
    },

    contentHeight:{
    height:1100,
    borderRadius: theme.sizes.radius*1.5,
    backgroundColor:theme.colors.white,
    width: width-5,
    marginLeft:2,
    marginRight:2,
    marginVertical:3

    },

    titleContainer: {
      flex: 1,
      alignSelf: 'stretch',
      justifyContent: 'center',
      alignItems: 'center',
    },

    imageTitle: {
      color: theme.colors.white,
      backgroundColor: 'transparent',
      fontSize: 24,
      fontWeight:'500',
      opacity:0.8
    },

    navTitleView: {
      height: MIN_HEIGHT-5,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 16,
      margin:5,
      opacity:0// to hide it at first
    },

    navTitle: {
      color: theme.colors.white,
      fontSize: 20,
      backgroundColor: 'transparent',
      opacity: 0.75,
      fontWeight:'500',
      paddingBottom:8
    },

    navSubtitle:{
        color: theme.colors.white,
        fontSize: 12,
        backgroundColor: 'transparent',
        opacity: 0.75,
        marginHorizontal:theme.sizes.padding,
        
    },

    // styling for table and its content
    tableContainer: 
    { flex: 1, 
      padding: 5,
       paddingTop:15, 
       backgroundColor: theme.colors.white,
       borderRadius:theme.sizes.radius
      
    },

    tableHead: 
    {  height: 40,  backgroundColor: theme.colors.gray },

    tableWrapper: 
    { flexDirection: 'row' },

    tableTitle: 
    { flex: 1, backgroundColor: '#f6f8fa' },

    tableRow: 
    {  height: 60 },

    tableText: 
    { textAlign: 'center', padding:5 }
  });
  
  export default class WelcomeScreen extends Component {
    constructor() {
      super();
      this.state = { 
      showNavTitle: false ,
      sight:pinpointSight,
      tableHead: ['', 'Adult', 'Remarks'],
      tableTitle: ['1 day pass', '3 day pass', '7 day pass' ],
        tableData: [
          ['$37 (USD)', ' Valid for one day'],
          ['$62 (USD)', 'The pass can be used for 3 separated days within 1 week'],
          ['$72 (USD)', 'The pass can be used for 7 separated days within 1 month'],
        ]};
    }



_renderItem ({item, index}, parallaxProps) {
  return (
      <View style={{borderRadius:theme.sizes.radius}}>
          <ImageBackground
              source={item.preview}
              style={{ width:width - 60,
                height: (width - (theme.sizes.padding *4))}}
              imageStyle={{
                borderRadius:theme.sizes.radius,  
              }}
              parallaxFactor={0.6}
              {...parallaxProps}
          >
          <Text style={[styles.title,{textAlign:'center',justifyContent:'flex-end',padding:15,color:'white', textShadowColor: 'rgba(0, 0, 0, 0.75)', textShadowOffset: {width: -1, height: 1}, textShadowRadius: 10}]}>{item.title}</Text>
          </ImageBackground>
      </View>
  );
}

  
    render() {
      const tableState = this.state;
      return (
        
          <HeaderImageScrollView
            showsVerticalScrollIndicator={false}
            maxHeight={MAX_HEIGHT}
            minHeight={MIN_HEIGHT}
            maxOverlayOpacity={0.6}
            minOverlayOpacity={0.3}
            fadeOutForeground    
            renderForeground={() => (
                <View style={styles.titleContainer}>
                  <Text style={styles.imageTitle}>Welcome to Angkor</Text>
                </View>
              )}
            renderHeader={() => <Image source={require('../Assets/Image/Angkor.jpg')} style={styles.image} />}
            renderFixedForeground={() => (
              <Animatable.View
                style={styles.navTitleView} 
                ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}>
              <Text style={styles.navTitle}>Welcome to Angkor </Text>
              </Animatable.View>
            )} >
             
           <LinearGradient colors={['black', '#4D4D4D', '#A6A6A6']}>

              <TriggeringView
              onHide={() => this.navTitleView.fadeInUp(200)}
              onDisplay={() => this.navTitleView.fadeOut(100)}>
              </TriggeringView>

               <View style={[styles.contentHeight]}>
                  <View style={styles.content}>
                     <Text style={styles.title}>About </Text> 
                     <Text style={styles.description}><Text style={{fontSize:20,fontWeight:'bold',color:'black'}}>Angkor (ប្រាសាទអង្គរ) </Text>{'was the capital of the Khmer empire between the begin of the 10th and the middle of the 15th century. It is a UNESCO world heritage and streches over some 400km2 including forested area and magnificent remains of the different capitals of the Khmer Empire. They include the famous Temple of Angkor Wat and,at Angkor Thom, the Bayon Temple with its countless sculptural decorations'}</Text>  
                  </View>
                  <View style={styles.content}>
                     <Text style={styles.title}>Information   
                     <MaterialCommunityIcons  name="information" color={theme.colors.gray} size={theme.sizes.font * 1.5}></MaterialCommunityIcons>
                     </Text> 

                      <View>
                        <Text style={styles.header1}>Opening Hours</Text>  
                        <Text style={styles.description}> 7:30 am - 5:30pm</Text> 
                      </View> 

                      <View>
                        <Text style={styles.header1}>Location</Text>  
                        <Text style={styles.description}> Siem Reap, Cambodia</Text>  
                      </View> 

                      <View>
                        <Text style={styles.header1}>Official Website</Text>  
                        <Text style={styles.description}> http://angkor.com.kh/</Text> 
                      </View>  

                      <View>
                     <Text style={[styles.header1]}>Entrance Fees</Text> 
                     </View>
                  </View>
                    <View style={styles.tableContainer}>
                            <Table>
                              <Row data={tableState.tableHead} flexArr={[1, 2, 4]} style={styles.tableHead} textStyle={styles.tableText}/>
                              <TableWrapper style={styles.tableWrapper}>
                                <Col data={tableState.tableTitle} style={styles.tableTitle} heightArr={[60,60]} textStyle={styles.tableText}/>
                                <Rows data={tableState.tableData} flexArr={[ 2, 4]} style={styles.tableRow} textStyle={styles.tableText}/>
                              </TableWrapper>
                            </Table>
                           <View style={{marginHorizontal:theme.sizes.margin}}>
                              <Text style={styles.description}>* Free for children under 12</Text> 
                              <Text style={styles.description}>* Free for VISA "K"</Text> 
                           </View>
                    </View>

                    <View style={styles.content}>
                        <Text style={[styles.title,{marginBottom:10}]}>Sights </Text> 
                        <View  style={{alignContent:'center',alignItems:'center'}}>
                          <Carousel
                          layout={'stack'} layoutCardOffset={8} 
                          ref={(c) => { this._carousel = c; }}
                          data={this.state.sight}
                          renderItem={this._renderItem}
                          sliderWidth={width}
                          sliderHeight={width}
                          itemWidth={ width - 60}
                          hasParallaxImages={true}
                          inactiveSlideOpacity={0.4}
                          loop={true}
                          autoplay={true}
                          lockScrollWhileSnapping={true}
                          autoplayInterval={2000}/>
                      </View>
                  </View>
               </View>
            </LinearGradient>
          </HeaderImageScrollView>
      );
    }
  }