import React from "react";
import { InputErrorField } from "./InputErrorField";

const InputField = ({ register, errors, type, placeholder }) => {
  return (
    <div>
      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor="username"
      >
        Name
      </label>
      <InputErrorField
        className="inputSignLog"
        register={register}
        type={type}
        errors={errors}
        id={"displayName"}
      />

      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor="username"
      >
        Email
      </label>
      <InputErrorField
        className="inputSignLog"
        register={register}
        type={type}
        errors={errors}
        id={"email"}
      />

      <label
        className="block text-grey-darker text-sm font-bold mb-2"
        htmlFor="username"
      >
        Password
      </label>
      <InputErrorField
        className="inputSignLog"
        register={register}
        type={"password"}
        errors={errors}
        id={"password"}
      />
    </div>
  );
};

export default InputField;
