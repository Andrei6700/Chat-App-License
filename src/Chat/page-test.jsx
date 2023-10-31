import React, { useState } from "react";
import "./page-test.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const TestPage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="home">
      <div className="container">
        {sidebarVisible && <Sidebar />}
        <Chat toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      </div>
    </div>
  );
};

export default TestPage;
