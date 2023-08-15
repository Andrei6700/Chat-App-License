import React from "react";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img
          src="https://images.pexels.com/photos/17882530/pexels-photo-17882530/free-photo-of-black-and-white-photo-of-woman-in-gown-walking-across-field-with-horse.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
          alt=""
        />
        <div>Hust now</div>
      </div>
      <div className="messageContent">
        <p>salut</p>
        {/* <img src="https://images.pexels.com/photos/17841137/pexels-photo-17841137/free-photo-of-best-friend.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load" alt="" /> */}
      </div>
    </div>
  );
};

export default Message;
