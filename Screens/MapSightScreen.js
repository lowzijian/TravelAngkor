import React, { Component } from 'react'
import { Text, View, Image} from 'react-native'
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import * as theme from '../utils/theme';
import { Button } from 'react-native-elements';
import firebase from 'react-native-firebase';
import { ActivityIndicator } from "react-native-paper";
import Database from '../utils/database';

const db = new Database();

export default class MapSightScreen extends Component {

    constructor(props) {
        super(props);
        this.toggleVisited = this.toggleVisited.bind(this);
        this.state = {
            isVisited: false,
            loading: true,
            sight: null,// must put the sight as state and update it using setState
        };
    }

    toggleVisited() {
        this.setState({
            isVisited: !this.state.isVisited
        })
    }

    componentWillUnmount(){
        console.log("trigger component willUnmount");
        console.log(this.state.isVisited);

        this.updateVisited();
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const sightId = navigation.getParam('sightId');// no nid to initialize above
        let sight = null;

        //console.log(`sights/${sightId}`);
        await firebase.firestore().collection('sights').doc(sightId).get()
        .then(function(doc) {
            sight = doc.data();
            //console.log(sight);
        })
        .then(() => this.setState({sight: sight, loading: false}))
        .catch(function(error) { // handle error
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
        //console.log(this.state.sight);
        this.getIsVisited();
    }

    toggleVisited() {
        let isVisited = '';

        if(this.state.isVisited == 0){
            isVisited = 1;
        }
        else{
            isVisited = 0;
        }

        this.setState({
            isVisited,
        })
    }

    getIsVisited() {
        let visitToggle = 0
        db.isVisitedByTitle(this.state.sight.title).then((data) => {
            visitToggle = data;
            console.log(visitToggle.isVisited)
            this.setState({
                isVisited:visitToggle.isVisited
            })
        }).catch((err) => {
            console.log(err);
            this.setState = {}
        })
    }

    updateVisited(){
        db.updateSightVisited(this.state.isVisited, this.state.sight.title)
    }

    render() {
        if (this.state.loading) {
            return (
                <ActivityIndicator />
            );
        }

        return (
            <HeaderImageScrollView
                showsVerticalScrollIndicator={false}
                maxHeight={theme.MAX_HEIGHT}
                minHeight={0}      
                scrollViewBackgroundColor= "transparent"
                renderHeader={() => <Image source={{uri: this.state.sight.preview}} style={theme.styling.backgroundImage} />}
            >
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
