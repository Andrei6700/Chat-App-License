import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { useTheme } from "../../context/dark-mode";

const Sidebar = ({ className, onChatSelect }) => {
  // Using the useTheme hook to get the current theme state
  const { theme } = useTheme();

  return (
    // Dynamic class names for the sidebar depending on the theme state
    <div className={`sidebar ${className} ${theme === "dark" ? "dark" : ""}`}>
      <Navbar /> {/* navbar component */}
      <Search /> {/* search component */}
      <Chats onChatSelect={onChatSelect} />{/* Chats component with onChatSelect prop */}
    </div>
  );
};

export default Sidebar;
