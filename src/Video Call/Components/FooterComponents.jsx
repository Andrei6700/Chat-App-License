import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faPhoneSlash,
  faShare,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";

export const FooterComponent = ({
  onMicClick,
  onVideoToggle,
  onEndCallClick,
  onShareClick,
  onMuteClick,
}) => {
  const muteClick = () => {
    onMuteClick && onMuteClick();
  };

  return (
    <div className="Footer">
      <div className="MeetingFooter">
        <div className="MeetingIcon" onClick={onMicClick}>
          <FontAwesomeIcon icon={faMicrophone} title="Mute Audio" />
        </div>
        <div className="MeetingIcon" onClick={onVideoToggle}>
          <FontAwesomeIcon icon={faVideo} title="Toggle Video" />
        </div>
        <div className="MeetingIcon" onClick={onEndCallClick}>
          <FontAwesomeIcon icon={faPhoneSlash} title="End Call" />
        </div>
        <div className="MeetingIcon" onClick={muteClick}>
          <FontAwesomeIcon icon={faVolumeMute} title="Mute" />
        </div>
        <div className="MeetingIcon" onClick={onShareClick}>
          <FontAwesomeIcon icon={faShare} title="Share" />
        </div>
      </div>
    </div>
  );
};

FooterComponent.defaultProps = {
  onMicClick: () => {},
  onVideoToggle: () => {},
  onEndCallClick: () => {},
  onShareClick: () => {},
  onMuteClick: () => {},
};

export default FooterComponent;
