import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export const VideoComponent = ({ you, friend }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // console.log("user 2 camera: " + (data.cameraCreated ? "on" : "off"));

  return (
    <div className="videoscreenUsers">
      <div className="participants">
        {/* user 1 */}
        <div className="card">
          
        <video className="video" playsInline autoPlay id="you" ref={you}></video>
         
             {/* <div className="avatar">
               <img src={currentUser.photoURL} alt="" />
             </div> */}
          
          <div className="name"> {currentUser.displayName} (You)</div>
        </div>
        <div className="participant">
          {/* user 2 */}
          <div className="card">
          <video className="video" playsInline autoPlay ref={friend} id="friend"></video>
            {/* <div className="avatar">
              <img src={data.user?.photoURL} alt="" />
            </div> */}
            <div className="name">{data.user?.displayName}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;


