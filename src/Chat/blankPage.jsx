import React from "react";
import logoDarkWhite from "../img/logo_dark-white-removebg-preview.png";
import { useTheme } from "../context/dark-mode";

const BlankPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`blankPageContainer ${theme}`}>
      <div className={`blankPageCenter ${theme}`}>
        <img src={logoDarkWhite} alt="" />
        <h2 style={{ fontSize: "36px", fontWeight: "800",textShadow:' #ad9b51 1px 0 10px'}}>
          Chat App for Windows
        </h2>
        <p
          className={`${theme}`}
          style={{ lineHeight: "20px", fontSize: "14px" }}
        >
          Send and receive messages without keeping your phone online.
        </p>
      </div>
    </div>
  );
};

export default BlankPage;
