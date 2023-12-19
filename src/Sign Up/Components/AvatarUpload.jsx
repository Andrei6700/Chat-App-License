import React from "react";
import Add from "../../img/addAvatar.png";

const AvatarUpload = ({ register, errors }) => {
  const bordercolor = errors.file ? "red" : "";

  return (
    <div>
<<<<<<< HEAD
      <input
        className="inputSignLog"
=======
      <input className="inputSignLog"
        required
>>>>>>> a4271641edaec1e1bc0388f3a92227d1771fe8f3
        type="file"
        id="file"
        style={{ borderColor: bordercolor }}
        {...register("file")}
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
