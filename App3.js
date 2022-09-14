// import { Text,TextInput,View, StyleSheet} from 'react-native';
// import React,{ useEffect, useState } from 'react';
// import axios from 'axios';

// const App =()=> {

//   const [weather, setWeather] = useState({})
//   const [city, setCity] = useState("Paris")
//   const [coord, setCoord] = useState({ lat : 48.8588897, lon : 2.3200410217200766})

//   const apiKey = "7ef1308ca5816422ab52653980391445"


//   //ici on on fait un axios/fectch juste pour recuperer la latitude et la longitude, grace au state coord
//   useEffect(() => {

//     if(Object.keys(weather).length === 0){
//       callApi()
//     }

//     let uri = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`

//     axios.get(uri)
//     .then(response => {

//       console.log(response.data[0]);
//       setCoord({
//         lat : response.data[0].lat,
//         lon : response.data[0].lon
//       })

//     })

//     .catch(error => {
//       setCoord({
//         lat : 48.8588897,
//         lon : 2.3200410217200766
//       })
//     }
//     )
//   },[city])


//   //ici on utilise la lat et lon recupérés au dessus pour le utiliser
//   const callApi = () => {

//     axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely&units=metric&lang=fr&appid=${apiKey}`)
//     .then(response => {
  
//       if(response.status === 200)
//       setWeather(response.data)
//       })
      
//     }

//   console.log(coord);
//   console.log(weather.weather);
    
//   return (

//     <View style= {styles.container}>

//       <Text>{weather.name}</Text>

//       <View style={{alignItems:'center', paddingTop:20}}>
//         <TextInput
//          value={city} 
//          onChangeText={(text)=>setCity(text)} 
//          placeholder='Entrez une Ville' 
//          style={styles.input}
//          onBlur={callApi}
//          />
//       </View>



//     </View>
//   );
// }

// export default App

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal : 20,
//     backgroundColor : 'white'
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: 'black',
//     backgroundColor : 'white',
//     padding: 10,
//     margin: 0,
//     width: '100%',
//   }
// });