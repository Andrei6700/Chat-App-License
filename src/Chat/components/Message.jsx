import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { isToday, isYesterday } from "date-fns";
import { format } from "date-fns";
import { useTheme } from "../../context/dark-mode";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const createdAt = message.date.toDate();
  const formattedHour = format(createdAt, "HH:mm");
  const formattedDate = isToday(createdAt)
    ? "Today"
    : isYesterday(createdAt)
    ? "Yesterday"
    : format(createdAt, "dd/MM/yyyy");
  console.log(formattedDate);

  const ref = useRef();
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setShowDate(false); // Ascunde data după primul mesaj al zilei
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${
        message.senderId === currentUser.uid && "owner"
      } ${theme}`}
    >
      {showDate && (
        <div className="messageDate">
          <span>{formattedDate}</span>
        </div>
      )}
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>{formattedHour}</span>
      </div>
      <div className="messageContent">
        <p className="ResponsiveTextChat">{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
