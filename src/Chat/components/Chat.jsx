import React, { useContext, useEffect, useState } from "react";
import Cam from "../../img/cam.svg";
import More from "../../img/more.svg";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../../context/ChatContext";
import more from "./../../img/menu.svg";
import { useTheme } from "../../context/dark-mode";
import BlankPage from "../blankPage.jsx";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const Chat = ({ toggleSidebar }) => {
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(value);
  }, [value]);

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
              <button
                style={{
                  display: data.cameraCreated ? "inline-block" : "none",
                }}
              >Join meet
                {/* 1.Afiseaza butonul doar daca camera a fost creată
                    2.adauga userul in camera creata de catre celalalt utilizator
                */}
                <img src={Cam} alt="" />
              </button>

              {/* butonul ce creaza camera  */}
              <button
                className="create"
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
