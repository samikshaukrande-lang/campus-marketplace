import React, { useEffect, useState } from "react";
import "./Profile.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import {
    FaEdit,
    FaEnvelope,
    FaPhone,
    FaUniversity
} from "react-icons/fa";

import axios from "axios";


const Profile = () => {


    const [editMode, setEditMode] = useState(false);


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");

    const [profileImage, setProfileImage] = useState(
        "https://i.pravatar.cc/150"
    );



    // GET PROFILE

    const fetchProfile = async () => {

        try {

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


            setName(user.name || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
            setDepartment(user.department || "");


            if(user.profileImage){

                setProfileImage(user.profileImage);

            }


        }
        catch(error){

            console.log(
                "Profile Fetch Error:",
                error.response?.data || error.message
            );

        }

    };



    useEffect(()=>{

        fetchProfile();

    },[]);






    // IMAGE CHANGE

    const handleImageChange = (e)=>{


        const file = e.target.files[0];


        if(file){


            const reader = new FileReader();


            reader.onloadend = ()=>{

                setProfileImage(reader.result);

            };


            reader.readAsDataURL(file);

        }


    };







    // UPDATE PROFILE

    const handleSaveProfile = async()=>{


        try{


            const token = localStorage.getItem("token");



            const response = await axios.put(

                "https://campus-marketplace-14dq.onrender.com/api/users/profile/update",

                {
                    name,
                    phone,
                    department,
                    profileImage
                },

                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }

            );



            console.log(response.data);



            alert(
                "Profile Updated Successfully"
            );



            setEditMode(false);



            // 🔥 Update Navbar Profile Image

            window.dispatchEvent(
                new Event("profileUpdate")
            );



            fetchProfile();



        }
        catch(error){


            console.log(
                "Profile Update Error:",
                error.response?.data || error.message
            );


            alert(
                "Profile Update Failed"
            );


        }


    };







return(

<div>


<Sidebar/>


<Navbar/>




<div className="profile-page">



<div className="profile-card">





<label className="profile-image-container">



<img

src={profileImage}

className="profile-img"

alt="profile"

/>




{

editMode &&

(

<input

type="file"

accept="image/*"

onChange={handleImageChange}

/>

)

}



</label>







{

editMode ?


(

<div className="edit-form">





<input

value={name}

onChange={(e)=>setName(e.target.value)}

placeholder="Enter Name"

/>






<input

value={email}

readOnly

placeholder="Email"

/>







<input

value={phone}

onChange={(e)=>setPhone(e.target.value)}

placeholder="Enter Phone"

/>







<input

value={department}

onChange={(e)=>setDepartment(e.target.value)}

placeholder="Enter Department"

/>







<button

onClick={handleSaveProfile}

>

Save Profile

</button>





</div>

)


:


(


<>


<h1>

{name}

</h1>




<p>

Student

</p>






<button

onClick={()=>setEditMode(true)}

>

<FaEdit/>

Edit Profile


</button>



</>


)


}





</div>









<div className="details-card">



<h2>

Personal Information

</h2>







<div className="detail">

<FaEnvelope/>

{email}

</div>








<div className="detail">

<FaPhone/>

{phone || "Not Added"}

</div>








<div className="detail">

<FaUniversity/>

{department || "Not Added"}

</div>







</div>







</div>





</div>


)


}



export default Profile;
