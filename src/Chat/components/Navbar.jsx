
    import React, { useContext } from "react";
    import {signOut} from "firebase/auth"
    import { auth } from '../../firebase/firebase'
    import { AuthContext } from '../../context/AuthContext'
    
    const Navbar = () => {
      const {currentUser} = useContext(AuthContext)
    
      return (
        <div className='navbar'>
          <div className="user">
         <div style={{width:"20%"}}>
            <img src={currentUser.photoURL} alt="" />
            <span style={{paddingLeft:"2%"}}> {currentUser.displayName} </span>
            </div>
            <button onClick={()=>signOut(auth)}>logout</button>
          </div>
        </div>
      )
    }
    
    export default Navbar