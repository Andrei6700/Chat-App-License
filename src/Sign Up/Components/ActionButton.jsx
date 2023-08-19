import React from "react";

const ActionButton = ({ disabled, text }) => {
  return <button disabled={disabled}>{text}</button>;
};

export default ActionButton;
