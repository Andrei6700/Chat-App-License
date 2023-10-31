import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/main");
    }).catch((error) => {
      console.error('eoare sign out:', error);
    });
  };

  return (
    <div className='navbar'>
      <div className="user">
        <div style={{width:"100%"}}>
          <img src={currentUser.photoURL} alt="" />
          <span style={{paddingLeft:"2%"}}> {currentUser.displayName} </span>
        </div>
        <button onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Navbar;