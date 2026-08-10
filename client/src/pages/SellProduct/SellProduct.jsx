import React, { useState } from "react";
import "./SellProduct.css";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";


const SellProduct = () => {


const [image,setImage] = useState("");

const [productName,setProductName] = useState("");
const [category,setCategory] = useState("");
const [price,setPrice] = useState("");
const [description,setDescription] = useState("");

const [college,setCollege] = useState("");
const [location,setLocation] = useState("");

const [condition,setCondition] = useState("");
const [contactNumber,setContactNumber] = useState("");





// IMAGE UPLOAD

const handleImageChange = (e)=>{


const file = e.target.files[0];


if(!file)
return;



const reader = new FileReader();


reader.onloadend = ()=>{


setImage(reader.result);


};



reader.readAsDataURL(file);



};








// ADD PRODUCT

const handleSubmit = async(e)=>{


e.preventDefault();



try{


const token = localStorage.getItem("token");



if(!token){


alert("Please Login First");

return;


}







const productData = {


image:image,


title:productName,


category:category,


price:Number(price),


description:description,


college:college,


pickupLocation:location,


condition:condition,


contactNumber:contactNumber



};






const response = await axios.post(


"https://campus-marketplace-14dq.onrender.com/api/products",


productData,


{


headers:{


Authorization:`Bearer ${token}`


}


}



);







console.log(
"PRODUCT ADDED:",
response.data
);




alert(
"Product Added Successfully ✅"
);






setImage("");

setProductName("");

setCategory("");

setPrice("");

setDescription("");

setCollege("");

setLocation("");

setCondition("");

setContactNumber("");





}



catch(error){



console.log(

error.response?.data || error

);



alert(

"Product Add Failed ❌"

);



}



};









return(



<div>


<Sidebar />


<div>


<Navbar />



<div className="sell-page">



<div className="sell-card">





<h1>

Sell Your Product

</h1>



<p>

Add your product details and connect with students

</p>








<form onSubmit={handleSubmit}>


<label>

Product Image

</label>





<div className="upload-box">



<FaCloudUploadAlt />


<p>

Upload Product Image

</p>





<input

type="file"

accept="image/*"

onChange={handleImageChange}

/>



</div>








{

image &&


<img

src={image}

alt="preview"

style={{

width:"100%",

height:"220px",

objectFit:"cover",

borderRadius:"12px",

marginTop:"15px"

}}


/>



}









<label>

Product Name

</label>



<input

type="text"

placeholder="Enter product name"

value={productName}

onChange={(e)=>

setProductName(e.target.value)

}

required

/>









<label>

Category

</label>




<select

value={category}

onChange={(e)=>

setCategory(e.target.value)

}

required

>



<option value="">

Select Category

</option>


<option>

Books

</option>


<option>

Electronics

</option>


<option>

Study Material

</option>


<option>

Hostel Essentials

</option>


<option>

Others

</option>



</select>









<label>

Condition

</label>



<select

value={condition}

onChange={(e)=>

setCondition(e.target.value)

}

required

>


<option value="">

Select Condition

</option>


<option>

New

</option>


<option>

Like New

</option>


<option>

Good

</option>


<option>

Used

</option>



</select>









<label>

Price

</label>



<input

type="number"

placeholder="Enter price"

value={price}

onChange={(e)=>

setPrice(e.target.value)

}

required

/>









<label>

Description

</label>



<textarea

rows="5"

placeholder="Write product description"

value={description}

onChange={(e)=>

setDescription(e.target.value)

}

required

/>









<label>

College / University

</label>



<input

type="text"

placeholder="Enter college name"

value={college}

onChange={(e)=>

setCollege(e.target.value)

}

required

/>









<label>

Pickup Location

</label>



<input

type="text"

placeholder="Enter pickup location"

value={location}

onChange={(e)=>

setLocation(e.target.value)

}

required

/>









<label>

Contact Number

</label>



<input

type="text"

placeholder="Enter contact number"

value={contactNumber}

onChange={(e)=>

setContactNumber(e.target.value)

}

required

/>









<button

className="submit-btn"

type="submit"

>

Post Product

</button>





</form>




</div>



</div>


</div>


</div>



);



};



export default SellProduct;
