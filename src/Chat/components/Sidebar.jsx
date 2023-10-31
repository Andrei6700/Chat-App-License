import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

const Sidebar = ({ className, onChatSelect }) => {
  return (
    <div className={`sidebar ${className}`}>
      <Navbar />
      <Search />
      <Chats onChatSelect={onChatSelect} />
    </div>
  );
};

export default Sidebar;