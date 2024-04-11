import React, { useState } from "react";
import "./page-test.css";
import "./dark - light.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

const TestPage = () => {
  // Using useState to handle the visibility state of the sidebar
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div className="home">
      <div className="container">
        {/* Sidebar component with dynamic className based on visibility state.
                    onChatSelect prop is a function that hides the sidebar when a chat is selected */}
        <Sidebar
          className={sidebarVisible ? "visible" : ""}
          onChatSelect={() => setSidebarVisible(false)}
        />
        {/* Chat component with a prop to toggle the visibility of the sidebar */}
        <Chat toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />
      </div>
    </div>
  );
};

export default TestPage;
