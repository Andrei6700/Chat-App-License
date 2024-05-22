import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  displayName: yup
    .string()
    .matches(/^[^\d]+$/, "Invalid name")
    .max(64, "Maxim 64 characters")
    .required("Invalid form"),
  email: yup.string().email("Invalid email").required("Invalid form"),
  password: yup
    .string()
    .matches(
      /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,64}$/,
      "Password must contain at least one special character"
    )
    .min(8, "Minimum 8 characters")
    .max(64, "Maximum 64 characters")
    .required("Invalid form"),
  file: yup
    .mixed()
    .required("A file is required")
    .test(
      "fileSize",
      "File too large",
      (value) => value && value[0] && value[0].size <= 1024 * 1024
    )
    .test(
      "fileType",
      "Unsupported Format",
      (value) =>
        value && value[0] && ["image/jpeg", "image/png"].includes(value[0].type)
    ),
});

const useFormData = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return { register, handleSubmit, errors };
};

export default useFormData;
