import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Image, ImageBackground ,TouchableOpacity,FlatList} from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Timeline from 'react-native-timeline-listview';
import { Header } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import * as theme from '../utils/theme';
import LinearGradient from 'react-native-linear-gradient';


const { width, height } = Dimensions.get('window');

const MIN_HEIGHT =Header.HEIGHT+50;
const MAX_HEIGHT =350;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
	  paddingTop:20,
	  backgroundColor:theme.colors.white
  },
  flex: {
    flex: 0,
  },
  fill: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  contentHeader: {
    backgroundColor: 'transparent',
    padding: 36,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 12,
    marginTop: 0,
  },
  title:{
    fontSize:25,
    fontWeight:'500',
    marginBottom:5,
    marginTop:15
  },  

  content:{
    marginHorizontal:theme.sizes.margin,
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly'

  },

  caption:{
  fontSize:10,
  padding:5,
  color:theme.colors.caption,
  alignSelf:'center'

  },

  header:{
    fontSize:13,
    fontWeight:'300',
    paddingBottom:15
  },

  infoContainer:{
    borderRadius:theme.sizes.radius,
    backgroundColor: 'rgb(242, 246, 248)',
    marginBottom:10,
    padding:15
  },

  description:{
    fontSize:13,
    paddingVertical:5,
    textAlign: 'justify',
    lineHeight:28,

  },

  circuitContainer: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    padding:24,
    borderRadius: theme.sizes.radius,
    backgroundColor:'rgb(242, 246, 248)',
    marginVertical:15
  },

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

  imageContainer:{
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    borderRadius: 5,
    marginVertical:5,
    resizeMode: 'cover',
  },

    // styling for the scroll view content
    backgroundImage: {
      width: width,
      height: MAX_HEIGHT,
      resizeMode: 'cover',
      alignSelf: 'stretch'
    },

    contentHeight:{
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

});


export default class DiscoverScreen extends Component {

  constructor(){
    super()

    this.data = [
      {time: '802 C.E.', title: 'Jayavarman II is crowned, rules until 850, founds kingdom of Angkor.', description: ''},
      {time: '877', title: 'Indravarman I becomes king, orders construction of Preah Ko and Bakhongtemples.', description: ''},
      {time: '889', title: 'Yashovarman I is crowned, rules until 900, completes Lolei, Indratataka, and Eastern Baray (reservoir), and builds Phnom Bakheng temple.', description: ''},
      {time: '899', title: 'Yasovarman I becomes king, rules until 917, establishes capital Yasodharapura on Angkor Wat site.', description: ''},
      {time: '928', title: 'Rajendravarman crowned, builds Eastern Mebon and Pre Rup.', description: ''}
    ]
   }

  

  render() {
    const { navigation } = this.props;
    const discoverArticle = navigation.getParam('discoverItem');
    const historyScreen = this.renderHistory(this.data);
    const sightsScreen = this.renderSights(discoverArticle);
    const cultureScreen = this.renderCulture(discoverArticle);
    const beforyougoScreen = this.renderBefore(discoverArticle);


    let screen;

    if( discoverArticle.id == 1){
      screen = cultureScreen
    }
     else if(discoverArticle.id == 2){
      screen = historyScreen
    }
    else if(discoverArticle.id == 3){
      screen = sightsScreen
    }
    else
    {
      screen = beforyougoScreen
    }


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
            <Text style={styles.imageTitle}>{discoverArticle.title}</Text>
          </View>
        )}
      renderHeader={() => <Image source={discoverArticle.preview} style={styles.backgroundImage} />}
      renderFixedForeground={() => (
        <Animatable.View
          style={styles.navTitleView} 
          ref={navTitleView => {
          this.navTitleView = navTitleView;
        }}>
        <Text style={styles.navTitle}>{discoverArticle.title} </Text>
        </Animatable.View>
      )} >
    <LinearGradient colors={['black', '#4D4D4D', '#A6A6A6']}>
        <TriggeringView
              onHide={() => this.navTitleView.fadeInUp(200)}
              onDisplay={() => this.navTitleView.fadeOut(100)}>
              </TriggeringView>

               <View style={[styles.contentHeight,{height:discoverArticle.contentHeight}]}>
               {screen}
               </View>
      </LinearGradient>
        </HeaderImageScrollView>
    );
  }

  
  renderHistory(data){
    return(
      <View>
         <View style={styles.content}>
          <Text style={styles.title}>About </Text>
        </View>
        <View style={styles.container}>
          <Timeline 
            innerCircle={'dot'}
            timeContainerStyle={{minWidth:52, marginTop: 0}}
            data= {data}
            separator={false}
            timeStyle={{color:'black', fontWeight:'bold'}}
            detailContainerStyle={{marginBottom: 20, paddingLeft: 5, paddingRight: 5, backgroundColor: "#F0F8FF", borderRadius: 10}}
            titleStyle={{color:'gray'}}
          /> 
        </View>
      </View>
    );
  }

  renderSights(sights){
    return(
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.description}>{sights.description}</Text>
        </View>
        <View>
        <Text style={styles.title}>Explore Now</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Search')}>
              <ImageBackground   
              style={[styles.flex, styles.circuitContainer, styles.shadow]}
              imageStyle={{ borderRadius: theme.sizes.radius }}
              source={require('../Assets/Image/GrandCircuit.jpg')}>
                <View>
                    <Text style={styles.containerTitle}>Grand Circuit </Text>
                    <Text style={styles.containerSubtitle}>Extension to Small circuit</Text>
                </View> 
              </ImageBackground>
            </TouchableOpacity>
      </View>
      <View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate('Search')}>
              <ImageBackground   
              style={[styles.flex, styles.circuitContainer, styles.shadow]}
              imageStyle={{ borderRadius: theme.sizes.radius }}
              source={require('../Assets/Image/SmallCircuit.jpg')}>
                <View>
                    <Text style={styles.containerTitle}>Small Circuit </Text>
                    <Text style={styles.containerSubtitle}>Steps into the boundary of fascinating cultures</Text>
                </View> 
              </ImageBackground>
            </TouchableOpacity>
      </View>
      </View>
    );
  }

  renderCulture(culture){
    return(
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.description}>{culture.description1}</Text>
        </View>
        <View>
          <Image style={[styles.imageContainer]}  source = {require('../Assets/Image/Culture1.jpg')}/>
           <View>
             <Text style={[styles.caption]}>Traditional Dance in Cambodia </Text>
           </View>
        </View>
        <View>
          <Text style={styles.description}>{culture.description2}</Text>
        </View>
        <View>
          <Image style={[styles.imageContainer]}  source = {require('../Assets/Image/Culture2.jpg')}/>
           <View>
             <Text style={[styles.caption]}>Buddhist monks in Cambodia </Text>
           </View>
        </View>
      </View>
    );
  }

  renderBefore(list){
    
 
    return(
      <View style={styles.content}>
        <View>
          <Text style={styles.title}>About</Text>
          <Text style={styles.description}>{list.description}</Text>
        </View>
        <View style = {styles.infoContainer}>
        { 
          // list.details.map((item, index) => {
          // return <Text style={styles.header}>{item}</Text>
           //})
        }
        </View>
      </View>
    );
  }
}

