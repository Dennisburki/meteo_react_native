import { Text, View, StyleSheet, TextInput, ImageBackground, TouchableOpacity,ScrollView, Image } from "react-native";
import axios from 'axios';
import { getMeteoByDay,getDays } from './src/tools/helper';
import React,{ useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo'
import Icono from 'react-native-vector-icons/Feather'

const App = () => {

  const days = getDays();

  const today = new Date()
  
  const [city, setCity] = useState("Paris")
  const [infoCity, setInfoCity] = useState({})
  const [forecast, setForecast] = useState([])
  const [isValid, setIsValid] = useState(false)
  const [showForecastByDay, setShowForecastByDay] = useState([])
  const [activeDisplay, setActiveDisplay] = useState(days[0])
  const [checkLogo, setCheckLogo] = useState("")

  const apiKey = "7ef1308ca5816422ab52653980391445"

  useEffect(() => {

    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)

    .then( response => {

      if(response.status ===200) {
       setInfoCity(response.data.city)
       setForecast(getMeteoByDay(response.data.list))
       setShowForecastByDay(getMeteoByDay(response.data.list)[0])
       setIsValid(true)
       setCheckLogo("")
       

      //  if(showForecastByDay[0].weather[0].icon === "01d") {
      //   setCheckLogo(require("./soleil.jpg"))
      // } else if(showForecastByDay[0].weather[0].icon === "02d" ) {
      //   setCheckLogo(require("./soleil.jpg"))
      // } else if(showForecastByDay[0].weather[0].icon === "03d") {
      //   setCheckLogo(require("./nuageux.jpg"))
      // } else if(showForecastByDay[0].weather[0].icon === "04d" ) {
      //   setCheckLogo(require("./nuageux.jpg"))
      // } else if(showForecastByDay[0].weather[0].icon === "09d" ) {
      //   setCheckLogo(require("./pluie.jpeg"))
      // } else if(showForecastByDay[0].weather[0].icon === "10d" ) {
      //   setCheckLogo(require("./pluie.jpeg"))
      // } else if(showForecastByDay[0].weather[0].icon === "11d" ) {
      //   setCheckLogo(require("./pluie.jpeg"))
      // } else if(showForecastByDay[0].weather[0].icon === "13d" ) {
      //   setCheckLogo(require("./pluie.jpeg"))
      // } else if(showForecastByDay[0].weather[0].icon === "50d" ) {
      //   setCheckLogo(require("./pluie.jpeg"))
      // }     
      }    
    }   
    )
    
    .catch(error => {
      setIsValid(false)
    }
    )
    
  },[city]
  )

  console.log(forecast) 
  console.log(infoCity);
  console.log(showForecastByDay);
  console.log(today);

  return (

    <View style={{flex:1}}>
       
       <ImageBackground source={checkLogo === "" ? showForecastByDay[0]?.weather[0].icon === "01d" || showForecastByDay[0]?.weather[0].icon === "02d" || showForecastByDay[0]?.weather[0].icon === "01n" ? require("./assets/soleil.jpg") : showForecastByDay[0]?.weather[0].icon === "03d" || showForecastByDay[0]?.weather[0].icon === "04d" || showForecastByDay[0]?.weather[0].icon === "04n" ? require("./assets/nuageux.jpg") : showForecastByDay[0]?.weather[0].icon === "09d" || showForecastByDay[0]?.weather[0].icon === "10d" || showForecastByDay[0]?.weather[0].icon === "10n" ? require("./assets/pluie.jpeg") : showForecastByDay[0]?.weather[0].icon === "13d" || showForecastByDay[0]?.weather[0].icon === "13n" ? require('./assets/neige.jpg') : showForecastByDay[0]?.weather[0].icon === "11d" || showForecastByDay[0]?.weather[0].icon === "11n" ? require('./assets/orage.jpg') : require("./assets/soleil.jpg") : require("./assets/soleil.jpg") } resizeMode="cover" style={styles.image}>
             
         <View style={{alignItems:'center', paddingTop:20,flexDirection:'row',paddingStart:30}}>
          
          <Icono name="search" size={35} style={{backgroundColor:'white', opacity:0.8,height:41,marginBottom:10, borderTopLeftRadius:5,borderBottomLeftRadius:5}}/>
          
             <TextInput
             value={city} 
             onChangeText={(text)=>setCity(text)} 
             placeholder='Entrez une Ville' 
             style={styles.input}        
             />

          </View>
          <ScrollView horizontal={true}>

          {days.map((day, index) => {
          
            return (
              <View key={index} style={{marginStart:5, marginEnd:5}}>
                <TouchableOpacity onPress={() =>{setShowForecastByDay(forecast[index]); setActiveDisplay(day)}}>
                  <Text style={[{color:'white', marginEnd:10, fontSize:24 }, activeDisplay === day ? {backgroundColor: 'rgba(0,0,0,0.4)',borderRadius:5} : {color:'white'}]}>{index == 0 ? "Aujourd'hui" : index == 1 ? "Demain" : day }</Text> 
                </TouchableOpacity>
              </View>
            )
            })}
          </ScrollView>
    
          {isValid &&   
          <View style= {styles.block}>
        
          <Text style={{ fontSize: 45, color: "white", textAlign:'center' }}>{infoCity.name}</Text>
          <Text style={{ fontSize: 15, color: "white" }}>Relevé à: {(showForecastByDay[0].dt_txt).slice(11,16)}</Text>
          <Text style={{ fontSize: 35, color: "white", margin: 15 }}>{showForecastByDay[0].main.temp}°C</Text>

          <View style={{flexDirection:'row'}}>
            <Image style={{width:80, height:80, alignItems:'center',marginTop:2}} source={{ uri: `http://openweathermap.org/img/wn/${showForecastByDay[0].weather[0].icon}@2x.png` }}/>
            <Text style={{ fontSize: 25, color: "white", margin: 15 }}>{showForecastByDay[0].weather[0].description}</Text>
          </View>
          
          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Max: {showForecastByDay[0].main.temp_max}°</Text>
            <Text style={{ fontSize: 25, color: "white", margin: 15 }}>Min: {showForecastByDay[0].main.temp_min}°</Text>
          </View>

          <Text style={{ fontSize: 25, color: "white" }}>Ressenti: {showForecastByDay[0].main.feels_like}°</Text>
          
          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 25, color: "white", marginTop: 15, marginHorizojustifyntal:15 }}><Icon name="drop" size={20}/> {showForecastByDay[0].main.humidity}%</Text>
            <Text style={{ fontSize: 25, color: "white", marginTop: 15, marginHorizontal:15}}><Icono name="wind" size={20}/> {showForecastByDay[0].wind.speed} km/h</Text>
          </View>
          
          </View>
          }
    
          {!isValid &&
          <View style= {{flex:10}}>
            <Text style={{ fontSize: 25, color: "white", margin: 15, textAlign:'center' }}>Ville non trouvée</Text>
          </View>}
          </ImageBackground>
          </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    flex: 1,
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "space-evenly",
    marginVertical: 16
  },
  input: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor : 'white',
        padding: 10,
        margin: 0,
        width: '100%',
        borderTopRightRadius: 5,
        borderBottomEndRadius:5,
        width: '80%',
        opacity: 0.8,
        marginBottom:10
       
      },
  block: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin:10,
    borderRadius:5,
    backgroundColor:'rgba(0,0,0,0.5)',
   
  }
});

export default App;