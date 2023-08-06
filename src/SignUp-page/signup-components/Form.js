import React from "react";
 import './Form.css'
import { InputField } from "./signup-form/input-field";
import { InputButtons } from "./signup-form/input-button";
import { OnSubmit } from "./signup-form/on-submit";
import { useFormData } from "./signup-form/form-data";

export const Form = () => {
    const { register, handleSubmit, errors } = useFormData();

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <InputField register={register} errors={errors} />
            <InputButtons register={register} />
        </form>
    )
}