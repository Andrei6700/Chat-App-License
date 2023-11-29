import React, { useContext, createContext, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactSwitch from "react-switch";

export const ThemeContext = React.createContext("null");

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/main");
      })
      .catch((error) => {
        console.error("eoare sign out:", error);
      });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="navbar" id={theme}>
        <div className="user">
          <div style={{ width: "100%" }}>
            <img src={currentUser.photoURL} alt="" />
            <span style={{ paddingLeft: "2%" }}>
              {" "}
              {currentUser.displayName}{" "}
            </span>
          </div>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Navbar;