export const setIcons =(icon)=> {
  let weatherCondition = parseInt(icon)
  let weatherIcon='';
 
  //rainy days
  if (weatherCondition >= 321 && weatherCondition <=531)
  {
    weatherIcon = 'weather-rainy';
  }

  //sunny days
  else if (weatherCondition == 800 || weatherCondition ==951)
  {
    weatherIcon = "weather-sunny"
  }

  //Lighthing storm
  else if (weatherCondition >= 210 && weatherCondition <=221 || weatherCondition >= 960)
  {
    weatherIcon =  "weather-lightning"
  }

  //Lightning rainy
  else if ((weatherCondition >= 200 && weatherCondition <=202) || (weatherCondition >= 230&& weatherCondition <=232))
  {
    weatherIcon =  "weather-lightning-rainy"
  }


  //cloudy
  else if (weatherCondition == 803 ||  weatherCondition<=804)
  {
    weatherIcon =  "weather-cloudy"
  }

   //Part cloudy
   else if (weatherCondition == 801 || weatherCondition ==802)
   {
     weatherIcon =  "weather-partlycloudy"
   }

    //windy
  else if ( weatherCondition ==905 || (weatherCondition >=952 && weatherCondition >=960 ) )
  {
    weatherIcon =  "weather-windy"
  }

  //hail
  else if ((weatherCondition >= 300 && weatherCondition <=321) || weatherCondition == 701 || weatherCondition == 906 )
  {
    weatherIcon = "weather-hail"
  }

  //fog
  else if (weatherCondition >= 721 && weatherCondition<=751)
  {
    weatherIcon = "weather-fog"
  }
  return weatherIcon;
}
// snow and typical catastrophe that wont happen in angkor wat is skipped
//refer to https://gist.github.com/tbranyen/62d974681dea8ee0caa1#file-icons-json-L255