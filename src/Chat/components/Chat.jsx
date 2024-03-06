import React, { useContext, useEffect, useState } from "react";
import Cam from "../../img/cam.svg";
import More from "../../img/more.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import more from "./../../img/menu.svg";
import { useTheme } from "../../context/dark-mode";
import BlankPage from "../blankPage.jsx";
import { useNavigate } from "react-router";

const Chat = ({ toggleSidebar }) => {
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const [roomId, setRoomId] = useState(""); //id room

  const navigate = useNavigate();

  const handleJoin = () => {
    if (roomId.length !== 20) return;
    navigate(`/call/${roomId}`);
  };

  return (
    <div className={`chat ${theme === "dark" ? "dark" : ""}`}>
      {data.chatId !== "null" ? (
        <>
          <div className={`chatInfo ${theme}`}>
            <div className="user">
              <button className="toggle-sidebar-button" onClick={toggleSidebar}>
                <img
                  src={more}
                  style={{ height: "24px", width: "24px" }}
                  alt=""
                />
              </button>
              <img src={data.user?.photoURL} alt="" />
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
              {/* Input pentru ID-ul camerei */}
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="meeting Id"
              />
              {/* button for join room */}
              <button type="button" onClick={handleJoin}>
                Join
              </button>

              {/* button for create  new room */}
              <button
                onClick={() => {
                  navigate(`/call/create`);
                }}
              >
                <img src={Cam} alt="" />
              </button>

              <button>
                <img src={More} alt="" />
              </button>
            </div>
          </div>
          <Messages />
          <Input />
        </>
      ) : (
        <BlankPage />
      )}
    </div>
  );
};

export default Chat;
