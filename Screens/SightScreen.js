import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import * as theme from '../utils/theme';


export default class DiscoverScreen extends Component {


  render() {
    const { navigation } = this.props;
    const sight = navigation.getParam('sight');

    return (
    <HeaderImageScrollView
      showsVerticalScrollIndicator={false}
      maxHeight={theme.MAX_HEIGHT}
      minHeight={theme.MIN_HEIGHT}      
      scrollViewBackgroundColor= "transparent"
      renderHeader={() => <Image source={{uri: sight.preview}} style={theme.styling.backgroundImage} />}>
      

        <View style={[theme.styling.contentHeight,{height:500}]}>
            <View style={theme.styling.contentContainer}>
                <Text style={theme.styling.title2}>{sight.title}</Text>
                <Text style={theme.styling.caption}>{sight.subtitle}</Text>
                <Text style={theme.styling.description}>{sight.description}</Text>
          </View>
        </View>

    </HeaderImageScrollView>
    );
  }

 

}

