import React, { useContext } from "react";
import Cam from "../../img/cam.svg";
import More from "../../img/more.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import more from "./../../img/menu.svg";

const Chat = ({ toggleSidebar }) => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="user">
          <button className="toggle-sidebar-button" onClick={toggleSidebar}>
            <img src={more} style={{ height: "24px", width: "24px" }} />
          </button>
          <img src={data.user?.photoURL} alt="" />
          <span>{data.user?.displayName}</span>
        </div>
        <div className="chatIcons">
          <button>
            <img src={Cam} alt="" />
          </button>
          <button>
            <img src={More} alt="" />
          </button>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
