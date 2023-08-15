import React from "react";
import { InputBox } from './input-box'
import {InputButtons} from  './input-button'

export function InputField({ register, errors }) {
  return (
    <div>
      <InputBox register={register} errors={errors} id={"name"} />
      <InputBox register={register} errors={errors} id={"email"} />
      <InputBox register={register} errors={errors} id={"password"} />
      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          {...register("avatarFile")}
        />
        {errors.avatarFile && <span className="error">Avatar is required</span>}
      </div>
      
    </div>
  );
}
