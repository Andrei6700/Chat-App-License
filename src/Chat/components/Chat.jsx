import React, { useContext } from "react";
import Cam from "../../img/cam.svg";
import More from "../../img/more.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
// import { AuthContext } from "../../context/AuthContext";
import more from "./../../img/menu.svg";
import { useTheme } from "../../context/dark-mode";
import BlankPage from "../blankPage.jsx";
import { Link } from "react-router-dom";

const Chat = ({ toggleSidebar }) => {
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();

  return (
    <div className={`chat ${theme === "dark" ? "dark" : ""}`}>
      {data.chatId !== "null" ? (
        <>
          <div className={`chatInfo ${theme}`}>
            <div className="user">
              <button className="toggle-sidebar-button" onClick={toggleSidebar}>
                <img src={more} style={{ height: "24px", width: "24px" }} />
              </button>
              <img src={data.user?.photoURL} alt="" />
              <span>{data.user?.displayName}</span>
            </div>
            <div className="chatIcons">
            <Link to="/call">
              <button>
                <img src={Cam} alt="" />
              </button>
              </Link>
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
