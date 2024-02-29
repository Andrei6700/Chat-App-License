import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const VideoComponent = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="videoscreenUsers">
      <div className="participants">
        <div className="participant">
          <div className="card">
            <video className="video" id="caller" autoPlay playsInline></video>
            <div className="avatar" ><img src={currentUser.photoURL} alt=""/></div>
            <div className="name"> "{currentUser.displayName}"</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;