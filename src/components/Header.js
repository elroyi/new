import React from "react";
import {Link} from "react-router-dom"; 



function Header (props) {

return (

    <div className = "header-parnet">

 <Link to = {'/'}>home</Link>
   <br />
 <Link to = {'/favorites'}>favorites</Link>

    </div>
         
)}


export default Header;