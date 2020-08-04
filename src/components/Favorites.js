import React from "react";
import Header from "./Header";



function Favorites (props) {

return (

    <div className ="favorites">

    <div className = "favorites-header">
    <Header />
    </div>

    <div className = "favorites-weathr">
    {props.favorites.map( f =>  
       <div className = "weather">
       <h1>{f.city}</h1>
       <h1>{f.temp}&deg;</h1>
       </div>
    ) }
    </div>  
    
 </div>       
)}


export default Favorites;