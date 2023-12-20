import React from "react";

const Input = ({ type, placeholder, err }) => {
  return (
    <input
      className={`inputSignLog ${err ? "error" : ""}`}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;