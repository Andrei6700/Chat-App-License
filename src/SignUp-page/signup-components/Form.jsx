import React from "react";
import { useNavigate } from "react-router-dom"; 
import { InputField } from "./signup-form/input-field";
import { InputButtons } from "./signup-form/input-button";
import { useFormData } from "./signup-form/form-data";
import { OnSubmit } from "./signup-form/on-submit"; 

export const Form = () => {
  const { register, handleSubmit, errors } = useFormData();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    console.log('Form submitted with data:', data);
    OnSubmit(data, navigate); 
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField register={register} errors={errors} />
      <InputButtons register={register} />
    </form>
  );
};
