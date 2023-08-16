import React, { useContext } from "react";
import {signOut} from "firebase/auth"
import { auth } from '../../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
return(
    <div className="navbar">
        <span className="logo">Chat name</span>
        <div className="user">
            <img src={currentUser.photoURL} alt="" />
            <div>{currentUser.displayName}</div>
            <button onClick={()=>signOut(auth)}>log out</button>
        </div>
    </div>
)
}
export default Navbar;
