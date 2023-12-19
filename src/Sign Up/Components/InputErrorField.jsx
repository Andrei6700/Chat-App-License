import React from "react";

<<<<<<< HEAD
export const InputErrorField = ({ id, register, errors, type }) => {
=======
export const InputErrorField = ({ id, register, errors }) => {
  const bordercolor = (input) => {
    if (errors[input]) return "red";
    else return "white";
  };

>>>>>>> a4271641edaec1e1bc0388f3a92227d1771fe8f3
  return (
    <div>
      <input
        id={id}
<<<<<<< HEAD
        className={`${id} ${errors[id] ? "error" : ""}`}
        placeholder={`Your ${id}`}
        {...register(id)}
        type={type}
      />
      <p id={`${id}-error`} className="errors">
=======
        className={id}
        placeholder={`Your ${id}`}
        style={{ borderColor: bordercolor(id) }}
        {...register(id)}
      />
      <p id={id} className="errors">
>>>>>>> a4271641edaec1e1bc0388f3a92227d1771fe8f3
        {errors[id]?.message}
      </p>
    </div>
  );
<<<<<<< HEAD
};

export default InputErrorField;
=======
};
>>>>>>> a4271641edaec1e1bc0388f3a92227d1771fe8f3
