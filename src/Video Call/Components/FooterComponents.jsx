import React from "react";

export const FooterComponent = () => {
    return(
  <div className="Footer">
    <div className="MeetingFooter">
      <div className="meetingIcon">
        {/* microfon + LOGICA */}
        microfon
      </div>

      <div className="meetingIcon">
        {/* diffen + LOGICA*/}
        diffen
      </div>

      <div className="meetingIcon">
        {/* camera video + LOGICA */}
        camera
      </div>

      <div className="meetingIcon">
        {/* endCall + LOGICA */}
        endcall
      </div>

      <div className="MeetingIcon">
        {/* shareScreen + LOGICA */}
        shareScreen
      </div>
    </div>
  </div>
    );
};

export default FooterComponent;