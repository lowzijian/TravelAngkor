import {StyleSheet,Dimensions} from 'react-native'
import { Header } from 'react-navigation';


const MIN_HEIGHT =Header.HEIGHT+50;
const MAX_HEIGHT =350;



const { width , height } = Dimensions.get('window');
const colors = {
    black: '#000',
    white: '#FFF',
    gray: '#DCE0E9',
    caption: '#BCCCD4',
    active: '#007BFA',
  };
  
  const sizes = {
    base: 16,
    font: 14,
    padding: 36,
    margin: 36,
    title: 24,
    radius: 12,
  };

  const styling = StyleSheet.create({

  //Default styling
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  center:{
    alignItems: 'center',
  },


  //Carousel item
  carouselItem1:{
    width:width - 60,
    height: (width - (sizes.padding *4)),
    justifyContent: 'center',
    alignItems: 'center',
    opacity:0.85
  },

  // Header styling
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: sizes.padding,
    paddingTop: sizes.padding * 1.33,
    paddingBottom: sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },

  title1:{
    fontSize: sizes.font * 1.5, 
    fontWeight:'bold' , 
    flex:1 ,
    marginTop:6,
    padding:5 
  },

  title2:{
    fontSize:25,
    fontWeight:'500',
    marginBottom:5,
    marginTop:15
  }, 

  contentHeader: {
    backgroundColor: 'transparent',
    padding: 36,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 12,
    marginTop: 0,
  },

  h1:{
    fontSize:13,
    fontWeight:'300',
    paddingBottom:15,
    textAlign: 'justify'  
  },

  h2:{
    fontSize:15,
    fontWeight:'500',
  },

  superscript:{
    fontSize:16,
    fontWeight:'bold',
    color:colors.black
  },

  imageName:{
    fontSize:25,
    fontWeight:'500',
    padding:15,
    color:colors.white,
    textShadowColor: 'rgba(0, 0, 0, 0.75)', 
    textShadowOffset: {width: -1, height: 1}, 
    textShadowRadius: 10,
    margin:sizes.margin

  },

  description:{
    fontSize:13,
    paddingVertical:5,
    textAlign: 'justify',
    lineHeight:28,

  },

  caption:{
    fontSize:12,
    color:colors.caption,
  },


  contentContainer:{
    marginHorizontal:sizes.margin,
    backgroundColor: 'transparent',
    justifyContent: 'space-evenly'

  },

  displayContainer:{
    width: width - (sizes.padding * 2),
    height: width * 0.6,
    borderRadius: 5,
    marginVertical:5,
    resizeMode: 'cover',
  },

  imageCaption:{
    fontSize:10,
    padding:5,
    color:colors.caption,
    alignSelf:'center'

  },

  //divider
  divider:{
    borderLeftColor: colors.white,
    borderLeftWidth: 3,
    borderRadius:15,
    margin:2
  },




  // angkor wat Discoverable items 
  discovered: {
  },
  discoverItemHeader: {
      overflow: 'hidden',
      borderTopRightRadius: sizes.radius,
      borderTopLeftRadius: sizes.radius,
  },
  discoverItem: {
    width: (width - (sizes.padding * 2)) / 2,
    marginHorizontal: 8,
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderRadius: sizes.radius,
    marginVertical: sizes.margin * 0.5,
    marginTop:2
  },
  discoverHeader: {
    overflow: 'hidden',
    borderTopRightRadius: sizes.radius,
    borderTopLeftRadius: sizes.radius,
    marginHorizontal: sizes.margin,
    width: width - (sizes.padding*2),
    padding:5,

  },
  discoverImage: {
    width: (width - (sizes.padding * 2)) / 2,
    height: (width - (sizes.padding * 2)) / 2,
  },


  //avatar for login - user
   avatar: {
    width: sizes.padding*1.5,
    height: sizes.padding*1.5,
    borderRadius: sizes.padding / 2,
    borderColor:'rgb(242, 246, 248)',
  },

  //information Container
  infoContainer:{
    borderRadius:sizes.radius,
    backgroundColor: 'rgb(242, 246, 248)',
    marginBottom:10,
    padding:15
  },

  //timeline Container
  timelineContainer: {
    flex: 1,
    padding: 15,
	  paddingTop:20,
	  backgroundColor:colors.white
  },

  //feesContainer
  feesContainer:{
    borderRadius:sizes.radius,
    backgroundColor: colors.white,
    marginVertical:4,
    padding:15
  },


  //weather Container 
    weatherContainer: {
      flexDirection:'row',
      width: width - (sizes.padding*2),
      height: width * 0.35, 
      marginHorizontal: sizes.margin,
      borderRadius: sizes.radius,
      backgroundColor:'rgb(242, 246, 248)',
      marginVertical:14
    },
   location: {
      flex:1,
      paddingHorizontal: sizes.padding*0.3,
      paddingVertical: sizes.padding * 0.2,
      marginHorizontal: 2,
    },
    weather:{
      flex:1,
      marginHorizontal: 2,  
    },
  
    // container 
    DefaultContainer: {
      width: width - (sizes.padding * 2),
      height: width * 0.6,
      padding:24,
      borderRadius: sizes.radius,
      backgroundColor:'rgb(242, 246, 248)',
      marginVertical:18
    },

  


    //Search screen containers
    searchbarContainer:{
        margin:sizes.margin-15,
    },

   sightCardContainer:{
        margin:sizes.margin-10,
        borderRadius:sizes.radius,
    },

   sightImageCardContainer:{
       height:115,
       resizeMode: 'contain',
   },
    

    //footer
    footer:{
      backgroundColor:'rgb(31, 34, 36)',
      alignItems: 'center', 
      padding:15 
    },

    //container title and subtitle
    containerTitle:{
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      fontSize:12,
      color:colors.white,
      fontSize:24,
      fontWeight:'bold'
    },

    containerSubtitle:{
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 10,
      fontSize:12,
      color:colors.white
    },

    // styling for the scroll view content
    backgroundImage: {
      width: width,
      height: MAX_HEIGHT,
      resizeMode: 'cover',
      alignSelf: 'stretch'
    },

    contentHeight:{
    borderRadius: sizes.radius*1.5,
    backgroundColor:colors.white,
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
      color: colors.white,
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
      color: colors.white,
      fontSize: 20,
      backgroundColor: 'transparent',
      opacity: 0.75,
      fontWeight:'500',
      paddingBottom:8
    },

    navSubtitle:{
        color: colors.white,
        fontSize: 12,
        backgroundColor: 'transparent',
        opacity: 0.75,
        marginHorizontal:sizes.padding,
        
    },

  })
  
  export {
    styling,
    colors,
    sizes,
    MAX_HEIGHT,
    MIN_HEIGHT,
    width,
    height,
    
  };