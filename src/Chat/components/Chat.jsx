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
// import Sidebar from "./Sidebar";

// https://stackoverflow.com/questions/44480053/how-to-detect-if-screen-size-has-changed-to-mobile-in-react documentation for display width
const Chat = ({ toggleSidebar }) => {
  // Using context to get data from ChatContext
  const { data } = useContext(ChatContext);
  // Using custom hook to get the current theme (dark or light)
  const { theme } = useTheme();
  // State for managing the room ID input
  const [roomId, setRoomId] = useState("");
  // State for managing the window width to handle responsiveness
  const [windowWidth, setWindowWidth] = useState(null);
  const navigate = useNavigate();
  // Check if window object is available (important for SSR)
  const isWindow = typeof window !== "undefined";
  // Function to get current window width
  const getWidth = () => (isWindow ? window.innerWidth : windowWidth);
  // Function to update window width state on resize
  const resize = () => setWindowWidth(getWidth());

  // Effect to handle window resize events
  useEffect(() => {
    if (isWindow) {
      setWindowWidth(getWidth());
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, [isWindow]);

  // console.log("screen width", windowWidth);
  // Function to handle joining a room
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
              {/* Input for room id */}
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
