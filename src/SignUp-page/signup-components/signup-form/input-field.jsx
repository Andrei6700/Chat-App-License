import React from "react";
import Add from "../../test/img/addAvatar.png";

export const InputField = () => {
  return (
    <div>
      <input required type="text" placeholder="display name" />
      <input required type="email" placeholder="email" />
      <input required type="password" placeholder="password" />
      <input required style={{ display: "none" }} type="file" id="file" />
      <label htmlFor="file">
        <img src={Add} alt="" />
        <span>Add an avatar</span>
      </label>
    </div>
  );
};
