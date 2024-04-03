import React, { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { isToday, isYesterday } from "date-fns";
import { format } from "date-fns";
import { useTheme } from "../../context/dark-mode";

const Message = ({ message, showDate }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const { theme } = useTheme();
  const createdAt = message.date.toDate();
  const formattedHour = format(createdAt, "HH:mm");
  const formattedDate = isToday(createdAt)
    ? "Today"
    : isYesterday(createdAt)
    ? "Yesterday"
    : format(createdAt, "dd.MM.yyyy");
  // console.log(formattedDate);

  const ref = useRef();

  return (
    <div>
      {showDate && (
        <div className="messageDate-Container">
          <span className={`messageDate ${theme}`}>{formattedDate}</span>
        </div>
      )}
      <div
        className={`message ${
          message.senderId === currentUser.uid && "owner"
        } ${theme}`}
      >
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
          {message.text && <p className="ResponsiveTextChat">{message.text}</p>}
          {message.img && (
            <p className="ResponsiveTextChat">
              <img src={message.img} alt="" style={{width:'441px'}} />
            </p>
          )}
          <span>
            {message.senderId === currentUser.uid &&
              (message.read ? "Seen" : "Unseen")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
