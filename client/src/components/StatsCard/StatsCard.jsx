import React from "react";
import "./StatsCard.css";


const StatsCard=({icon,title,value})=>{


return(

<div className="stats-card">


<div className="stats-icon">

{icon}

</div>


<div>

<h4>{title}</h4>

<h2>{value}</h2>


</div>


</div>


)


}


export default StatsCard;
