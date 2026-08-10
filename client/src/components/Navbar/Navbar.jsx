import React, {useState, useEffect} from "react";
import "./Navbar.css";

import {
    FaBell,
    FaHeart
} from "react-icons/fa";

import {useNavigate} from "react-router-dom";

import axios from "axios";


const Navbar =()=>{


const navigate = useNavigate();



const [profileImage,setProfileImage] = useState(
    "https://i.pravatar.cc/40"
);



const [profileName,setProfileName] = useState(
    "Student"
);





const fetchProfile = async()=>{


try{


const token = localStorage.getItem("token");


const response = await axios.get(

"https://campus-marketplace-14dq.onrender.com/api/users/profile",

{

headers:{
Authorization:`Bearer ${token}`
}

}

);



const user = response.data;



setProfileName(
    user.name || "Student"
);



if(user.profileImage){

setProfileImage(user.profileImage);

}



}
catch(error){


console.log(
"Navbar Profile Error:",
error.response?.data || error.message
);


}


};








useEffect(()=>{


fetchProfile();



window.addEventListener(
"profileUpdate",
fetchProfile
);



return()=>{


window.removeEventListener(
"profileUpdate",
fetchProfile
);



};


},[]);








return(


<div className="navbar">



<div className="nav-right">





<div

className="notification wishlist-icon"

onClick={()=>navigate("/wishlist")}

>

<FaHeart/>

</div>







<div

className="notification"

onClick={()=>alert("No new notifications")}

>

<FaBell/>

</div>








<div className="profile">



<img

src={profileImage}

alt="profile"

/>





<div>


<h4>

{profileName}

</h4>



<p>

Student

</p>


</div>



</div>






</div>





</div>


);


};



export default Navbar;
