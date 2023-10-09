
    import React, { useContext } from "react";
    import {signOut} from "firebase/auth"
    import { auth } from '../../firebase/firebase'
    import { AuthContext } from '../../context/AuthContext'
    
    const Navbar = () => {
      const {currentUser} = useContext(AuthContext)
    
      return (
        <div className='navbar'>
          <div className="user">
          <span> <img src={currentUser.photoURL} alt="" />
           {currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>logout</button>
          </div>
        </div>
      )
    }
    
    export default Navbar