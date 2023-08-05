import React from "react";
import { InputBox } from "./input-box";

export function InputField({ register, errors }) {
  return (
    <div>
      <InputBox register={register} errors={errors} id={"name"} />
      <InputBox register={register} errors={errors} id={"email"} />
      <InputBox register={register} errors={errors} id={"password"} />
    </div>
  );
}