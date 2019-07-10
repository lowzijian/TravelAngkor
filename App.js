import {
  createStackNavigator, createAppContainer
} from 'react-navigation';




// import all screens from the Screens folder
import HomeScreen from './Screens/HomeScreen';
import MapScreen from './Screens/MapScreen';
import DiscoverScreen from './Screens/DiscoverScreen';
import WelcomeScreen from './Screens/WelcomeScreen';
import SearchScreen from './Screens/SearchScreen';
import SightScreen from './Screens/SightScreen';


//animation in navigation transition
import { fromRight } from 'react-navigation-transitions';


const AppNavigator =  createStackNavigator({
  Home: {
    screen: HomeScreen,
  },

  Map:{
    screen:MapScreen,
  },

  Discover:{
    screen: DiscoverScreen,
  },

  Welcome:{
    screen: WelcomeScreen,
  },

  Search:{
    screen: SearchScreen,    
  },

  Sight:{
    screen: SightScreen,    
  }

}, {
  initialRouteName: 'Home',
  transitionConfig: () => fromRight(600),
  defaultNavigationOptions:{
    header:null
  }
});   

export default createAppContainer(AppNavigator);






