import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ThemeContext, useTheme } from "../../context/dark-mode";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/main");
      })
      .catch((error) => {
        console.error("Eroare la sign out:", error);
      });
  };

  return (
    <div className={`navbar ${theme === "dark" ? "dark" : ""}`}>
      <div className="user">
        <div style={{ width: "100%" }}>
          <img src={currentUser.photoURL} alt="" />
          <span style={{ paddingLeft: "2%" }}>{currentUser.displayName}</span>
        </div>

{/* toggle for dark mode */}
<label class="toggle-darkmode" onChange={toggleTheme} checked={theme === "dark"} for="switch">
    <input id="switch" class="input" type="checkbox"/>

    <div class="icon svg--moon">
        <svg height="20" width="20" fill="rgb(136, 136, 136)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fill-rule="evenodd"></path>
        </svg>
    </div>

    <div class="icon svg--sun">
        <svg height="20" width="20" fill="#d4d41e" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
        </svg>
    </div>
</label>
        
{/* btn for logout */}
        <button onClick={handleSignOut} class="Btn-sign-body">
          <div class="btn-sign-svg">
            <svg viewBox="0 0 512 512" style={{width:'20px'}}>
              <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
            </svg>
          </div>

          <div class="Btn-sign-text">Logout</div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
