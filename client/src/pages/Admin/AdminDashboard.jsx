import React from "react";
import "./AdminDashboard.css";


import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";


import {
FaUsers,
FaBox,
FaShoppingCart,
FaRupeeSign
} from "react-icons/fa";



const AdminDashboard=()=>{


return(

<div>


<Sidebar/>

<Navbar/>



<div className="admin-page">


<h1>
Admin Dashboard
</h1>



<div className="admin-stats">


<div className="admin-card">

<FaUsers/>

<h2>
1200
</h2>

<p>
Users
</p>

</div>




<div className="admin-card">

<FaBox/>

<h2>
560
</h2>

<p>
Products
</p>

</div>





<div className="admin-card">

<FaShoppingCart/>

<h2>
350
</h2>

<p>
Orders
</p>

</div>




<div className="admin-card">

<FaRupeeSign/>

<h2>
₹45000
</h2>

<p>
Sales
</p>

</div>



</div>








<div className="admin-section">


<h2>
Categories Graph
</h2>


<div className="graph">


Electronics  ████████

<br/>

Books       █████

<br/>

Study       ████


</div>


</div>







<div className="verification">


<h2>
Verification Requests
</h2>



<div className="request">


Rahul Patil - Product Verification

<button>
Approve
</button>


</div>



<div className="request">


Sneha Shinde - Seller Verification


<button>
Approve
</button>


</div>



</div>




</div>


</div>


)


}


export default AdminDashboard;
