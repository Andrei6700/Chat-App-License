import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";
import { useTheme } from "../../context/dark-mode";

const Sidebar = ({ className, onChatSelect }) => {
  const { theme } = useTheme();

  return (
    <div className={`sidebar ${className} ${theme === 'dark' ? 'dark' : ''}`}>
    <Navbar />
      <Search />
      <Chats onChatSelect={onChatSelect} />
    </div>
  );
};

export default Sidebar;