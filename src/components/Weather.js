import React,{useEffect} from 'react';

import Header from './Header';
import Form from './Form';
import Daily from './Daily';

const API_key = "I1gKf7FcF8vPxXNbNDNSlBK6mvmSSjWC"

function Weather (props) {

    useEffect ( () => {
      console.log("getweater")
      getWeather(); 
      });


    const getWeather = async () => {

        const k = props.city_key.toString();

        const api_call = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${k}?apikey=${API_key}`);
      
        const response = await api_call.json();
  
        props.changeTemp(response[0].Temperature.Metric.Value,response[0].WeatherText,response[0].WeatherIcon);
    }
    

     return (

        <div className="weathr-parnet">
   <Header />
   <h1>Cities Forecast</h1>
   <Form loadweather = {props.getKey} getDaily = {props.getDaily} isFavorites = {props.isFavorites}/> 
   <div className = "weather">
     <span >{props.icon}</span>
   <h1>{props.city}</h1>
   <h2>{props.temp}&deg;</h2>
   <h2>{props.text}</h2>
   </div>
   <button onClick = {()=>props.addFavorites()}>  {(props.isFavorites) ? 'remove from favoriets' : 'add to favoriets '}</button>
   <h1>5 day forecast</h1>
   <div className = "daily-parnt">
   {props.week.map ( (w,index) => 
   
   <Daily date ={w.date} temp = {w.temp} key = {index} />
   )}
   </div>
        </div>
     )}


export default Weather;