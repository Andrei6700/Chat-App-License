import React from "react";

const Navbar = () => {
return(
    <div className="navbar">
        <span className="logo">Chat name</span>
        <div className="user">
            <img src="https://images.pexels.com/photos/9208706/pexels-photo-9208706.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" />
            <div>Andrei</div>
            <button>log out</button>
        </div>
    </div>
)
}
export default Navbar;
