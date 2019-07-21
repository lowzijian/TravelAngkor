import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import * as theme from '../utils/theme';
import { Button } from 'react-native-elements';



export default class DiscoverScreen extends Component {

  constructor(props) {
    super(props);
    this.toggleVisited = this.toggleVisited.bind(this);
    this.state = {
      isVisited:false
    };
  }


  toggleVisited() {
    this.setState({
      isVisited: !this.state.isVisited
    })
  }

  render() {
    const { navigation } = this.props;
    const sight = navigation.getParam('sight');



    return (
    <HeaderImageScrollView
      showsVerticalScrollIndicator={false}
      maxHeight={theme.MAX_HEIGHT}
      minHeight={0}      
      scrollViewBackgroundColor= "transparent"
      renderHeader={() => <Image source={{uri: sight.preview}} style={theme.styling.backgroundImage} />}>
      

        <View style={[theme.styling.contentHeight,{height:500}]}>
            <View style={[theme.styling.contentContainer]}>
                    <Text style={theme.styling.title2}>{sight.title}</Text>
                    <Text style={theme.styling.caption}>{sight.subtitle}</Text>
            </View>
              <View style={theme.styling.contentContainer}>
                  <Text style={theme.styling.description}>{sight.description}</Text>
              </View>
              <View style={[theme.styling.contentContainer,{marginTop:25}]}>
                  <Button  type="outline" title= {this.state.isVisited ? 'Visit' : 'Visited'} buttonStyle = {[{borderColor:"grey", backgroundColor:this.state.isVisited ? 'white' : 'grey',borderRadius:theme.sizes.radius} ,theme.styling.shadow]} titleStyle ={{color:this.state.isVisited ? 'grey' : 'white'}}
                     onPress={() =>{this.toggleVisited()}}/>
              </View>
        </View>

    </HeaderImageScrollView>
    );
  }

 

}

