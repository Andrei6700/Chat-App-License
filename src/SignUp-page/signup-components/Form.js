import React from "react";
import './Form.css'
import { InputField } from "./signup-form/input-field";
import { InputButtons } from "./signup-form/input-button";
import { OnSubmit } from "./signup-form/on-submit";
import { useFormData } from "./signup-form/form-data";
import { useHistory } from "react-router-dom";


export const Form = () => {
    const history = useHistory(); 
    const { register, handleSubmit, errors } = useFormData();

    const handleFormSubmit = (data) => {
        OnSubmit(data)
            .then(response => {
                console.log(response.data);
                console.log('Redirecting...');
                history.push("/"); 
            })
            .catch(error => {
                console.log(error);
                alert('An error ');
            });
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <InputField register={register} errors={errors} />
            <InputButtons register={register} />
        </form>
    );
}
