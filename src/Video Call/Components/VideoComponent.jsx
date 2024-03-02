import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export const VideoComponent = ({ you, friend, isCameraOn }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  console.log("isCameraOn:", isCameraOn); 

  return (
    <div className="videoscreenUsers">
      <div className="participants">
        {/* user 1 */}
        <div className="card">
          <video className="video" autoPlay id="you" ref={you}></video>
          <div className="avatar">
            <img src={currentUser.photoURL} alt="" />
          </div>
          <div className="name"> "{currentUser.displayName}"</div>
        </div>
        <div className="participant">
          {/* user 2 */}
          <div className="card">
            <video className="video" autoPlay id="friend" ref={friend}></video>
            <div className="avatar">
              <img src={data.user?.photoURL} alt="" />
            </div>

            <div className="name"> "{data.user?.displayName}"</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
