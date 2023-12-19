import React from "react";

export const InputErrorField = ({ id, register, errors, type }) => {
  return (
    <div>
      <input
        id={id}
        className={`${id} ${errors[id] ? "error" : ""}`}
        placeholder={`Your ${id}`}
        {...register(id)}
        type={type}
      />
      <p id={`${id}-error`} className="errors">
        {errors[id]?.message}
      </p>
    </div>
  );
};

export default InputErrorField;
