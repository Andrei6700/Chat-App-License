import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export const useFormData = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[^\d]+$/, "Invalid name")
      .max(64, "Maxim 64 characters")
      .required("Invalid form"),
    email: yup
      .string()
      .email("Invalid email")
      .required("Invalid form"),
    password: yup
      .string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invalid password")
      .max(1024, "Maxim 1024 characters")
      .required("Invalid form"),
      avatarFile: yup
      .mixed()
      .required("Please upload an avatar image"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
};
