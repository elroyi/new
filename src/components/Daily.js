import React from 'react';


function Daily (props) {

    const fToc =  f =>{ return Math.floor((f-32)*(5/9)) } 

     
     return (
    
         
            
            <div className = "daily-item">
   
   <h3>{props.date}</h3>
   
   <h2>{fToc(props.temp) }&deg;</h2>
   
            </div>

        
        )
     
}


export default Daily;