import React from "react";
import "./page-test.css";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";

export const TestPage = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};
