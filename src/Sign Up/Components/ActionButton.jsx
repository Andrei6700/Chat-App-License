import React from "react";

const ActionButton = ({ disabled, text, onClick }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      tabIndex="0"
    >
      {text}
    </button>
  );
};

export default ActionButton;
