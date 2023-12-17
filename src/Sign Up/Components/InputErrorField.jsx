import React from "react";

export const InputErrorField = ({ id, register, errors }) => {
  const bordercolor = (input) => {
    if (errors[input]) return "red";
    else return "white";
  };

  return (
    <div>
      <input
        id={id}
        className={id}
        placeholder={`Your ${id}`}
        style={{ borderColor: bordercolor(id) }}
        {...register(id)}
      />
      <p id={id} className="errors">
        {errors[id]?.message}
      </p>
    </div>
  );
};