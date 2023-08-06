import React from "react";

export const InputBox = ({ id, register, errors }) => {
  const bordercolor = (input) => {
    if (errors[input]) return "red";
    else return "white";
  };

  return (
    <div class="mb-3">
      <label for="{` ${id}`}" class="form-label">{` ${id}`}</label>
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
