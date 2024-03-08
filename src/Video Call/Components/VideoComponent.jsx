import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export const VideoComponent = ({ you, friend }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  return (
    <div className="videoscreenUsers">
      <div className="participants">
        {/* user 1 */}
        <div className="card">
        <video className="video" playsInline autoPlay id="you" ref={you}></video>
          <div className="name"> {currentUser.displayName} (You)</div>
        </div>
        <div className="participant">
          {/* user 2 */}
          <div className="card">
          <video className="video" playsInline autoPlay ref={friend} id="friend"></video>
            <div className="name">{data.user?.displayName} (He/She)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;