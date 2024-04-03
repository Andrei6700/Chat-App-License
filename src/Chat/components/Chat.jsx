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
import Sidebar from "./Sidebar"

// https://stackoverflow.com/questions/44480053/how-to-detect-if-screen-size-has-changed-to-mobile-in-react documentation for display width
const Chat = ({ toggleSidebar }) => {
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const [roomId, setRoomId] = useState(""); //id room
  const [windowWidth, setWindowWidth] = useState(null);

  const navigate = useNavigate();
  const isWindow = typeof window !== 'undefined';
  const getWidth = () => isWindow ? window.innerWidth : windowWidth;

  const resize = () => setWindowWidth(getWidth());

  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth());
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, [isWindow]);

  // console.log("screen width", windowWidth);

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
        <>{/*windowWidth >= 764 &&*/ <BlankPage />}</>
      )}
    </div>
  );
};

export default Chat;