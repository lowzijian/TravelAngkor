import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, Image , TouchableOpacity} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { Header } from 'react-navigation';
import * as theme from '../utils/theme';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from'react-native-vector-icons/FontAwesome'



const { width, height } = Dimensions.get('window');

const MIN_HEIGHT =Header.HEIGHT+50;
const MAX_HEIGHT =300;

const styles = StyleSheet.create({

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


  title:{
    fontSize:28,
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
  fontSize:12,
  color:theme.colors.caption,
  },

  description:{
    fontSize:13,
    paddingVertical:5,
    textAlign: 'justify',
    lineHeight:28,

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
    height:500,
    borderRadius: theme.sizes.radius*1.5,
    backgroundColor:theme.colors.white,
    width: width-5,
    marginLeft:2,
    marginRight:2,
    marginVertical:3

},

});


export default class DiscoverScreen extends Component {


  render() {
    const { navigation } = this.props;
    const sight = navigation.getParam('sight');

    return (
    <HeaderImageScrollView
      showsVerticalScrollIndicator={false}
      maxHeight={MAX_HEIGHT}
      minHeight={MIN_HEIGHT}
      renderHeader={() => <Image source={sight.preview} style={styles.backgroundImage} />}>
      
        <LinearGradient colors={['black', '#4D4D4D', '#A6A6A6']}>
                <View style={[styles.contentHeight]}>
                        <View style={styles.content}>
                            <Text style={styles.title}>{sight.title}</Text>
                            <Text style={styles.caption}>{sight.subtitle}</Text>
                            <Text style={styles.description}>{sight.description}</Text>
                      </View>
                </View>
        </LinearGradient>
    </HeaderImageScrollView>
    );
  }

 

}

