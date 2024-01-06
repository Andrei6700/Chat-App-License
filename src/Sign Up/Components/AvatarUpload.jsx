import React from "react";
import Add from "../../img/addAvatar.png";

const AvatarUpload = ({ register, errors }) => {
  const bordercolor = errors.file ? "red" : "";

  return (
    <div>
      <input
        className="inputSignLog"
        type="file"
        id="file"
        style={{ borderColor: bordercolor }}
        {...register("file", { required: true })}
      />
      <label htmlFor="file">
        <img src={Add} alt="" />
        <span>Add an avatar</span>
      </label>
      {errors.file && <p className="errors">{errors.file.message}</p>}
    </div>
  );
};

export default AvatarUpload;
