import React from "react";
import Add from "../../img/addAvatar.png";

const AvatarUpload = () => {
  return (
    <div>
      <input className="inputSignLog"
        required
        style={{ display: "none" }}
        type="file"
        id="file"
      />
      <label htmlFor="file">
        <img src={Add} alt="" />
        <span>Add an avatar</span>
      </label>
    </div>
  );
};

export default AvatarUpload;
