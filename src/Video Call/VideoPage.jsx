import React from "react";
import VideoComponent from "./Components/VideoComponent";
import FooterComponent from "./Components/FooterComponents";
import "./css/styling.css"

export const VideoCall = () => (
  <div className="app">
    <div className="VideoContainer">
      <VideoComponent />
      <FooterComponent />
    </div>
  </div>
);

export default VideoCall;