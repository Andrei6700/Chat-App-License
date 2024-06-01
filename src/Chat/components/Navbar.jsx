import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";
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
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />

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
