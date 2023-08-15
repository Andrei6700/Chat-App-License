import React from "react";

export const InputBox = ({ id, register, errors }) => {
  const bordercolor = (input) => {
    if (errors[input]) return "red";
    else return "white";
  };

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">{id}</label>
      <input
        id={id}
        className="form-control"
        placeholder={` ${id}`}
        style={{ borderColor: bordercolor(id) }}
        {...register(id)}
      />
    </div>
  );
};
