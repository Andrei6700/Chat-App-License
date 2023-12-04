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
    <div className={`navbar ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="user">
        <div style={{ width: "100%" }}>
          <img src={currentUser.photoURL} alt="" />
          <span style={{ paddingLeft: "2%" }}>{currentUser.displayName}</span>
        </div>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        <button onClick={handleSignOut}>Sign out</button>
      </div>
    </div>
  );
};

export default Navbar;