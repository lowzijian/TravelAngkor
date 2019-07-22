import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import * as theme from '../utils/theme';
import { Button } from 'react-native-elements';
import Database from '../utils/database';

const db = new Database();


export default class SightScreen extends Component {

  constructor(props) {
    super(props);
    this.toggleVisited = this.toggleVisited.bind(this);

  this.state ={
      sight: this.props.navigation.getParam('sight'),
      isVisited:0}
  }

  componentDidMount() {
    this.getIsVisited();
  }
  componentWillUnmount(){
    this.updateVisited();
  }

  toggleVisited() {
    this.setState({
      isVisited: !this.state.isVisited
    })
  }

  getIsVisited() {
    let visitToggle = 0
    db.isVisitedByTitle(this.state.sight.title).then((data) => {
      visitToggle = data;
      console.log(visitToggle)
      this.setState({
        isVisited:visitToggle
      })
    }).catch((err) => {
    console.log(err);
    this.setState = {
    }
  })
}

updateVisited(){
  db.updateSightVisited(this.state.isVisited)
}

  render() {

    return (
    <HeaderImageScrollView
      showsVerticalScrollIndicator={false}
      maxHeight={theme.MAX_HEIGHT}
      minHeight={0}      
      scrollViewBackgroundColor= "transparent"
      renderHeader={() => <Image source={{uri: this.state.sight.preview}} style={theme.styling.backgroundImage} />}>
      

        <View style={[theme.styling.contentHeight,{height:500}]}>
            <View style={[theme.styling.contentContainer]}>
                    <Text style={theme.styling.title2}>{this.state.sight.title}</Text>
                    <Text style={theme.styling.caption}>{this.state.sight.subtitle}</Text>
            </View>
              <View style={theme.styling.contentContainer}>
                  <Text style={theme.styling.description}>{this.state.sight.description}</Text>
              </View>
              <View style={[theme.styling.contentContainer,{marginTop:25}]}>
                  <Button  type="outline" title= {this.state.isVisited ? 'Visited' : 'Visit'} buttonStyle = {[{borderColor:"grey", backgroundColor:this.state.isVisited ? 'lightgrey' : 'white',borderRadius:theme.sizes.radius} ,theme.styling.shadow]} titleStyle ={{color:this.state.isVisited ? 'white' : 'grey'}}
                     onPress={() =>{this.toggleVisited()}}/>
              </View>
        </View>

    </HeaderImageScrollView>
    );
  }

 

}

