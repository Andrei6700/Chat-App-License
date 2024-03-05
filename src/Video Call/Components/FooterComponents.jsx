import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPhoneAlt,
  faShareAlt,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

function FooterComponent({
  VideoToggle,
  mute,
  DisconnectCall,
  share,
  toggleCamera,
}) {
  return (
    <div className="Footer" id="controls">
      <div className="MeetingFooter">
        {/* camera video */}
        <button
          className="MeetingIcon"
          onClick={toggleCamera}
          ref={VideoToggle}
          id="VideoToggle "
        >
          <FontAwesomeIcon icon={faVideo} alt="VideoToggle " />
        </button>

        {/* microfon */}
        <button className="MeetingIcon" ref={mute} id="mute">
          <FontAwesomeIcon icon={faMicrophone} alt="mute" />
        </button>

        {/* leave call */}
        <button
          className="MeetingIcon"
          ref={DisconnectCall}
          id="DisconnectCall"
        >
          <FontAwesomeIcon icon={faPhoneAlt} alt="DisconnectCall" />
        </button>

        {/* share meet id */}
        <button className="MeetingIcon" ref={share} id="share">
          <FontAwesomeIcon icon={faShareAlt} alt="share" />
        </button>
      </div>
    </div>
  );
}

export default FooterComponent;