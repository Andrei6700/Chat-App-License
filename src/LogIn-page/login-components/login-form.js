import React from "react";
import './login-form.css'
import { InputField } from "./login-form/input-field";
import { InputButtons } from "./login-form/input-button";
import { OnSubmit } from "./login-form/on-submit";
import { useFormData } from "./login-form/form-data";

export const Form = () => {
    const { register, handleSubmit, errors } = useFormData();

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <InputField register={register} errors={errors} />
            <InputButtons register={register} />
        </form>
    )
}