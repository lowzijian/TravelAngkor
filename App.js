import {
  createStackNavigator, createAppContainer
} from 'react-navigation';
import React, { Component } from 'react';
import FontAwesome from'react-native-vector-icons/FontAwesome'
import { TouchableOpacity,StyleSheet,View} from 'react-native';


// import all screens from the Screens folder
import HomeScreen from './Screens/HomeScreen';
import MapScreen from './Screens/MapScreen';
import DiscoverScreen from './Screens/DiscoverScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import SearchScreen from './Screens/SearchScreen';


//animation in navigation transition
import { fromRight } from 'react-navigation-transitions';
import * as theme from './utils/theme';

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
    // Static navigation header
    header: {
      paddingHorizontal: theme.sizes.padding,
      paddingTop: theme.sizes.padding,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
    },
  })

const AppNavigator =  createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
     header:null
  }

  },
  Map:{
    screen:MapScreen,
    navigationOptions: {
      headerLeft:   (  
        <View style={[styles.flex, styles.row, styles.header]}>     
        <TouchableOpacity  style = {{ width: 100, height: 100, }}onPress={ () => { navigation.goBack() }} >
          <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1.5} />
        </TouchableOpacity>
      
      </View>
      ),  headerTransparent: true,
    }
  },

  Discover:{
    screen: DiscoverScreen,
    navigationOptions: {
      headerLeft:   (  
        <View style={[styles.flex, styles.row, styles.header]}>     
        <TouchableOpacity  onPress={ () => { navigation.goBack() }} >
          <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1.5} />
        </TouchableOpacity>
      
      </View>
      ),  headerTransparent: true,
    }
  },

  Welcome:{
    screen: WelcomeScreen,
    navigationOptions: {
      headerLeft:   (  
        <View style={[styles.flex, styles.row, styles.header]}>     
        <TouchableOpacity  onPress={ () => {  navigation.goBack() }} >
          <FontAwesome name="chevron-left" color={theme.colors.white} size={theme.sizes.font * 1.5} />
        </TouchableOpacity>
      </View>
      ),  headerTransparent: true,
    }
  },

  Search:{
    screen: SearchScreen,    
    navigationOptions: {
      header:null}
  }

}, {
  initialRouteName: 'Home',
  transitionConfig: () => fromRight(600),
});   

export default createAppContainer(AppNavigator);






