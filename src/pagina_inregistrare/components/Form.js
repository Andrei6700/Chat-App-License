import './Form.css'

export const Form = () => {
    const { register, handleSubmit, errors } = useFormData();

    return (
        <form onSubmit={handleSubmit(OnSubmit)}>
            <InputField register={register} errors={errors} />
            <InputButtons register={register} />
        </form>
    )
}