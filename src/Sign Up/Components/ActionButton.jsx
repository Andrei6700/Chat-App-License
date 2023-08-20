import React from "react";

const ActionButton = ({ disabled, text, onEnterKeyPress }) => {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onEnterKeyPress(); 
    }
  };

  return (
    <button disabled={disabled} onClick={onEnterKeyPress} onKeyPress={handleKeyPress}>
      {text}
    </button>
  );
};

export default ActionButton;
