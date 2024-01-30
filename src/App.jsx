
import { useEffect, useState } from 'react';
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const APIkey = '8f9b2e821d2a04d1716e25c9a02fefd4';

function App() {

  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [textInput, setTextInput] = useState('');
  const [finder, setFinder] = useState();
  const [hasError, setHasError] = useState(false);


  const success = position =>{
    //console.log(position);
    const obj = {
      lat: position.coords.latitude,
      lon: position.coords.longitude,
    }

    setCoords(obj);
  }

useEffect(() => {
  if(coords){
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIkey}`;
  
  axios.get(url)
  .then(res => {
    const obj = {
      celcius: (res.data.main.temp - 273.15).toFixed(2),
      fahrenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(2)
    }
    setTemp(obj);
    setWeather(res.data)})
  .catch(err => console.log(err)
  )
  .finally(() =>{
    setIsLoading(false);
  })
  }
  
}, [coords]);

useEffect(() => {
  if(textInput){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${textInput}&appid=${APIkey}`;
  axios.get(url)
  .then(res => {
    const obj = {
      celcius: (res.data.main.temp - 273.15).toFixed(2),
      fahrenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(2)
    }
    setTemp(obj);
    setHasError(false)
    setFinder(res.data)
  })
  .catch(err => {
    setHasError(true);
    console.log(err);
  })
  }
}, [textInput])


useEffect(() => {
  navigator.geolocation.getCurrentPosition(success);
}, []);

//console.log(coords);
//console.log(weather);
  return (
    <div className="app">
      {
        isLoading?
          <h2>Loading.....</h2>
          :
          textInput?
           <WeatherCard
      wheather = {finder}
      temp = {temp}
      setTextInput = {setTextInput}
      hasError={hasError}
    />
    : 
      <WeatherCard
      wheather = {weather}
      temp = {temp}
      setTextInput = {setTextInput}
      hasError = {hasError}
    />
    }
    </div>
  )
}

export default App
