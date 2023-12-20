  import { yupResolver } from "@hookform/resolvers/yup";
  import * as yup from "yup";
  import { useForm } from "react-hook-form";

  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const useFormData = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(schema),
    });
  
    return { register, handleSubmit, errors };
  };

  export default useFormData;
