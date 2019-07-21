import React, { Component } from 'react'
import { Text, View,  Image, ImageBackground ,TouchableOpacity} from 'react-native'
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import Timeline from 'react-native-timeline-listview';
import * as Animatable from 'react-native-animatable';
import * as theme from '../utils/theme';

export default class DiscoverScreen extends Component {

  constructor(){
    super()

    this.data = [
      {time: '802 C.E.', title: 'Jayavarman II is crowned, rules until 850, founds kingdom of Angkor.', description: ''},
      {time: '877', title: 'Indravarman I becomes king, orders construction of Preah Ko and Bakhongtemples.', description: ''},
      {time: '889', title: 'Yashovarman I is crowned, rules until 900, completes Lolei, Indratataka, and Eastern Baray (reservoir), and builds Phnom Bakheng temple.', description: ''},
      {time: '899', title: 'Yasovarman I becomes king, rules until 917, establishes capital Yasodharapura on Angkor Wat site.', description: ''},
      {time: '928', title: 'Jayavarman IV takes throne, establishes capital at Lingapura (Koh Ker).', description: ''},
      {time: '944', title: 'Rajendravarman crowned, builds Eastern Mebon and Pre Rup.', description: ''},
      {time: '967', title: 'Delicate Banteay Srei temple built.', description: ''},
      {time: '968', title: ' Reign of Jayavarman V, starts work on Ta Keo temple but never finishes it.', description: ''},
      {time: '1002', title: 'Khmer civil war between Jayaviravarman and Suryavarman I, construction begins on Western Baray.', description: ''},
      {time: '1002', title: 'Suryavarman I wins civil war, rules until 1050.', description: ''},
      {time: '1050', title: 'Udayadityavarman II takes throne, builds Baphuon.', description: ''},
      {time: '1060', title: 'Western Baray reservoir finished.', description: ''},
      {time: '1080', title: 'Mahidharapura Dynasty founded by Jayavarman VI, who builds Phimai temple.', description: ''},
      {time: '1113', title: 'Suryavarman II was crowned king, rules until 1150, designs Angkor Wat.', description: ''},
      {time: '1140', title: 'Construction begins on Angkor Wat.', description: ''},
      {time: '1177', title: 'Angkor sacked by the Chams people from southern Vietnam, partially burned, Khmer king killed.', description: ''},
      {time: '1181', title: 'Jayavarman VII, famous for defeating Chams, becomes king, sacks Chams capital in reprisal in 1191.', description: ''},
      {time: '1186', title: 'Jayavarman VII builds Ta Prohm in honor of his mother.', description: ''},
      {time: '1191', title: 'Jayavarman VII dedicates Preah Khan to his father.', description: ''}
    ]
   }

  

  render() {
    const { navigation } = this.props;
    const discoverArticle = navigation.getParam('discoverItem');
    const historyScreen = this.renderHistory(discoverArticle);
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
    else if(discoverArticle.id == 4)
    {
      screen = beforyougoScreen
    }


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
            <Text style={theme.styling.imageTitle}>{discoverArticle.title}</Text>
          </View>
        )}
      renderHeader={() => <Image source={discoverArticle.preview} style={theme.styling.backgroundImage} />}
      renderFixedForeground={() => (
        <Animatable.View
          style={theme.styling.navTitleView} 
          ref={navTitleView => {
          this.navTitleView = navTitleView;
        }}>
        <Text style={theme.styling.navTitle}>{discoverArticle.title} </Text>
        </Animatable.View>
      )} >
        <TriggeringView
              onHide={() => this.navTitleView.fadeInUp(200)}
              onDisplay={() => this.navTitleView.fadeOut(100)}>
        </TriggeringView>

          <View style={theme.styling.contentHeight}>
            {screen}
          </View>
        </HeaderImageScrollView>
    );
  }

  
  renderHistory(history){
    return(
      <View>
        <View style={theme.styling.contentContainer}>
          <Text style={theme.styling.title2}>About </Text>
          <Text style={theme.styling.description}>{history.description}</Text>
        </View>
        <View style={theme.styling.timelineContainer}>
          <Timeline 
            circleColor='rgb(69, 23, 29)'
            lineColor='rgb(106, 69, 74)'
            innerCircle={'dot'}
            timeContainerStyle={{minWidth:52, marginTop: 0}}
            data= {this.data}
            separator={false}
            timeStyle={{color:'black', fontWeight:'bold'}}
            detailContainerStyle={theme.styling.timelineDetailContainer}
            titleStyle={theme.styling.h2}
          /> 
        </View>
      </View>
    );
  }

  renderSights(sights){
    return(
      <View style={theme.styling.contentContainer}>
        <View>
          <Text style={theme.styling.title2}>About</Text>
          <Text style={theme.styling.description}>{sights.description}</Text>
        </View>
        <View>
        <Text style={theme.styling.title2}>Explore Now</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate(('Search'), { type: 'grand' })}>
              <ImageBackground   
              style={[theme.styling.flex, theme.styling.DefaultContainer, theme.styling.shadow]}
              imageStyle={{ borderRadius: theme.sizes.radius }}
              source={require('../Assets/Image/GrandCircuit.jpg')}>
                <View>
                    <Text style={theme.styling.containerTitle}>Grand Circuit </Text>
                    <Text style={theme.styling.containerSubtitle}>Extension to Small circuit</Text>
                </View> 
              </ImageBackground>
            </TouchableOpacity>
      </View>
      <View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.navigation.navigate(('Search'), { type: 'small' })}>
              <ImageBackground   
              style={[theme.styling.flex, theme.styling.DefaultContainer, theme.styling.shadow]}
              imageStyle={{ borderRadius: theme.sizes.radius }}
              source={require('../Assets/Image/SmallCircuit.jpg')}>
                <View>
                    <Text style={theme.styling.containerTitle}>Small Circuit </Text>
                    <Text style={theme.styling.containerSubtitle}>Steps into the boundary of fascinating cultures</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
      </View>
      </View>
    );
  }

  renderCulture(culture){
    return(
      <View style={theme.styling.contentContainer}>
        <View>
          <Text style={theme.styling.title2}>About</Text>
          <Text style={theme.styling.description}>{culture.description1}</Text>
        </View>
        <View>
          <Image style={[theme.styling.displayContainer]}  source = {require('../Assets/Image/Culture1.jpg')}/>
           <View>
             <Text style={[theme.styling.imageCaption]}>Traditional Dance in Cambodia </Text>
           </View>
        </View>
        <View>
          <Text style={theme.styling.description}>{culture.description2}</Text>
        </View>
        <View>
          <Image style={[theme.styling.displayContainer]}  source = {require('../Assets/Image/Culture2.jpg')}/>
           <View>
             <Text style={[theme.styling.imageCaption]}>Buddhist monks in Cambodia </Text>
           </View>
        </View>
      </View>
    );
  }

  renderBefore(list){
    if(list.details != null){
    return(
      <View style={theme.styling.contentContainer}>
        <View>
          <Text style={theme.styling.title2}>About</Text>
          <Text style={theme.styling.description}>{list.description}</Text>
        </View>
        <View style = {theme.styling.infoContainer}>
        { 

           list.details.map((item, index) => {
           return ( 
           <View key={index} style= {[theme.styling.row]}> 
             <Text style={[theme.styling.h1, {justifyContent: 'flex-start'}]}>{index + 1}.</Text>
             <Text style={[theme.styling.h1, {justifyContent: 'flex-end',paddingHorizontal:15}]}>{item}</Text>
           </View>
           )
           })
          
        }
        </View>
      </View>
    
    );
      }
  }
}

