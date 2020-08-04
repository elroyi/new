import React,{useState,useEffect} from 'react';
import './App.css';
import Weather from './components/Weather';
import {HashRouter as Router , Route , Switch} from 'react-router-dom';
import Favorites from './components/Favorites'

const API_key = "I1gKf7FcF8vPxXNbNDNSlBK6mvmSSjWC"

function App() {


const [city , setCity] = useState('Tel Aviv');
const [key , setKey] = useState('215854');
const [temp , setTemp] = useState('');
const [text , setText] = useState('');
const [week, setWeek] = useState ([]);
const [favorites, setFavorites] = useState ([]);
const [isFavorites, setisFavorites] = useState (false);
const [icon, setIcon] = useState('')


useEffect ( () => {
   getDaily('215854') 
},[]);



useEffect ( () => {
  console.log('f');
   setisFavorites(favorites.some(i => i.city.includes(city)))  ;
   if(isFavorites)setIcon('**F**')
   else setIcon('')
});



const getKey = async e => {

  const city = e;

  const api_call = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_key}&q=${city}`);

  const response = await api_call.json();
  
  setKey (response[0].Key);
  
  setCity (response[0].EnglishName)
}


const changeTemp = (val,text) => {
 
  setTemp(val);

  setText(text);
}



const getDaily = async (k) => {
    
  const api_call = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${k}?apikey=${API_key}`);
  const response = await api_call.json();
   let arr = [];
   for (let i = 0 ;i<5; i++)
   arr = [...arr,{date: response.DailyForecasts[i].Date.substring(0,10), temp: response.DailyForecasts[i].Temperature.Maximum.Value }]
   setWeek(arr) 
}


const addFavorites = () => {

  if (!isFavorites)
     setFavorites([...favorites,{id: key, city : city, temp: temp }]);
    
  else setFavorites( favorites.filter(p => p.city !== city));
    
}




  return (

    <div className="App"> 

<Router>
         <Switch>

         <Route exact path="/" render = {props => (
         
              <Weather city ={city} city_key ={key} temp = {temp} text = {text}  changeTemp = {changeTemp} addFavorites = {addFavorites} isFavorites = {isFavorites} getKey = {getKey} getDaily = {getDaily} week ={week} icon ={icon}/>)}/> 
         
         <Route exact path="/favorites" render = {props => (
         
              <Favorites favorites = {favorites} />)}/> 
        
        </Switch> 

     </Router>  
  
    </div>
  );
}

export default App;
