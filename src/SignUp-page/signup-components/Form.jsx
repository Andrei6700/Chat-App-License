

import React from "react";
import { InputField } from "./signup-form/input-field";
import { InputButtons } from "./signup-form/input-button";
import { useFormData } from "./signup-form/form-data";
import { OnSubmit } from "./signup-form/on-submit"; 

export const Form = () => {
  const { register, handleSubmit, errors } = useFormData();

  const handleFormSubmit = (data) => {
    OnSubmit(data); 
 
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField register={register} errors={errors} />
      <InputButtons register={register} />
    </form>
  );
};
