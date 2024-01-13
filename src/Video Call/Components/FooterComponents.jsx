import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faVideo,
  faVideoSlash,
  faMicrophoneSlash,
  faPhoneSlash,
} from "@fortawesome/free-solid-svg-icons";

const FooterComponent = ({ onMicClick, onVideoToggle, onEndCallClick }) => {
  const videoRef = React.useRef(null);
  const [streamState, setStreamState] = useState({
    mic: true,
    video: false,
  });

  const micClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        mic: !currentState.mic,
      };
    });
  };

  const endCallClick = () => {
    try {
      let tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    } catch (e) {
      console.error("Error stopping tracks:", e);
    }
    onEndCallClick && onEndCallClick();
  };

  const onVideoClick = () => {
    setStreamState((currentState) => {
      return {
        ...currentState,
        video: !currentState.video,
      };
    });
  };

  useEffect(() => {
    onMicClick && onMicClick(streamState.mic);
  }, [streamState.mic]);

  useEffect(() => {
    onVideoToggle && onVideoToggle(streamState.video);
  }, [streamState.video]);

  return (
    <div className="Footer">
      <div className="MeetingFooter">
        <div
          className={"MeetingIcon " + (!streamState.mic ? "active" : "")}
          onClick={micClick}
        >
          <FontAwesomeIcon
            icon={!streamState.mic ? faMicrophoneSlash : faMicrophone}
            title={streamState.mic ? "Mute Audio" : "Unmute Audio"}
          />
        </div>
        <div
          className={"MeetingIcon" + (streamState.video ? " active" : "")}
          onClick={onVideoClick}
        >
          <FontAwesomeIcon
            icon={!streamState.video ? faVideoSlash : faVideo}
            title={streamState.video ? "Hide Video" : "Show Video"}
          />
        </div>
        <div className="MeetingIcon" onClick={endCallClick}>
          <FontAwesomeIcon icon={faPhoneSlash} />
        </div>
      </div>
    </div>
  );
};

FooterComponent.defaultProps = {
  onMicClick: () => {},
  onVideoToggle: () => {},
  onEndCallClick: () => {},
};

export default FooterComponent;
