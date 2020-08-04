import React, { useEffect, useState } from "react";

const API_key = "I1gKf7FcF8vPxXNbNDNSlBK6mvmSSjWC"


function Form  (props)  {
    const [display, setDisplay] = useState(true);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    


    const getOptions = async () => {
        const city = [];
        
        if (search !==''){

        const api_call = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=I1gKf7FcF8vPxXNbNDNSlBK6mvmSSjWC&q=${search}`);
       
        const response = await api_call.json();
  
        response.map(r =>city.push(r.LocalizedName) )

        setOptions(city);
        
     } else setOptions([])
    
    }
  
    useEffect(()  => {
     
     getOptions()
    },[search]);
  
    // useEffect(() => {
    //   window.addEventListener("mousedown", handleClickOutside);
    //   return () => {
    //     window.removeEventListener("mousedown", handleClickOutside);
    //   };
    // });
  
 

  
    const updateCityDex = async city => {
      
      setSearch(city);

      props.loadweather(city)

      const api_call = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_key}&q=${city}`);

      const response = await api_call.json();
      
      let key = (response[0].Key);
      
      props.getDaily(key)

       setDisplay(false);

      setOptions([]);
    };
    
  
    return (
      <div  >

            <div >
            <div className = "form" >
         
           <input
          className ="auto"
           onClick={() => setDisplay(true)}
          placeholder="Type to search"
          value={search}
          name="city"
          onChange={event =>{
            let val = event.target.value
            if (/[^A-Za-z]/ig.test(val)) alert("only english letters")
            val = val.replace(/[^A-Za-z]/ig, '')
             
           setSearch(val)}}
        />
        {/* {display && ( */}
          <div >
            {options
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updateCityDex(value)}
                    className="option"
                    key={i}
                    tabIndex="0"
                  >
                    <span>{value}</span>
                    
                </div>) })}

            </div>)

            </div>
            </div>
            
          </div>
    
    )
  };




export default Form;
