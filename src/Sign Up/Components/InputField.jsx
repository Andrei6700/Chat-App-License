import React from "react";

const InputField = ({ type, placeholder }) => {
  return <input className="inputSignLog" required type={type} placeholder={placeholder} />;
};

export default InputField;