import React from "react";

const InputErrorField = ({ id, register, errors, type, placeholder }) => {
  return (
    <div>
      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor={id}
      >
        {placeholder}
      </label>
      <input
        id={id}
        className={`inputSignLog ${errors[id] ? "error" : ""}`}
        placeholder={`Your ${placeholder.toLowerCase()}`}
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