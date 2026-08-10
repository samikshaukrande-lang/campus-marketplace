import React from "react";
import "./Sidebar.css";

import {
  FaHome,
  FaShoppingBag,
  FaHeart,
  FaPlusCircle,
  FaList,
  FaUser,
  FaComments,
  FaSignOutAlt,
  FaSearch,
  FaTags
} from "react-icons/fa";

import { NavLink, useLocation, useNavigate } from "react-router-dom";



const Sidebar = () => {


const location = useLocation();

const navigate = useNavigate();



// Logout Function

const handleLogout = ()=>{


localStorage.removeItem("profileImage");

localStorage.removeItem("profileName");


// Login page वर redirect

navigate("/");


};





// Product Details page वर Sidebar hide

if(location.pathname === "/product-details"){

return null;

}






return (


<div className="sidebar">






<div className="logo">

Campus<span>Market</span>

</div>









<ul className="menu">







<li>

<NavLink

to="/dashboard"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaHome/>

<span>
Dashboard
</span>


</NavLink>

</li>









<li>

<NavLink

to="/marketplace"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaShoppingBag/>

<span>
Marketplace
</span>


</NavLink>

</li>









<li>

<NavLink

to="/sell"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaPlusCircle/>

<span>
Sell Product
</span>


</NavLink>

</li>









<li>

<NavLink

to="/my-listings"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaList/>

<span>
My Listings
</span>


</NavLink>

</li>









{/* Lost & Found */}

<li>

<NavLink

to="/lost-found"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaSearch/>

<span>
Lost & Found
</span>


</NavLink>

</li>









{/* Campus Deals */}

<li>

<NavLink

to="/campus-deals"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaTags/>

<span>
Campus Deals
</span>


</NavLink>

</li>









<li>

<NavLink

to="/wishlist"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaHeart/>

<span>
Wishlist
</span>


</NavLink>

</li>









<li>

<NavLink

to="/chat"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaComments/>

<span>
Chat
</span>


</NavLink>

</li>









<li>

<NavLink

to="/profile"

className={({isActive}) =>
isActive ? "active" : ""
}

>

<FaUser/>

<span>
Profile
</span>


</NavLink>

</li>






</ul>









<div

className="logout"

onClick={handleLogout}

>


<FaSignOutAlt/>

<span>
Logout
</span>


</div>






</div>


);


};



export default Sidebar;
