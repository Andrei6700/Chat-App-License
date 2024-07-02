import React from "react";
import "../styles/styles.css";
import InputField from "../Components/InputField";
import AvatarUpload from "../Components/AvatarUpload";
import ActionButton from "../Components/ActionButton";
import { Link } from "react-router-dom";
import animation from "../../img/Messaging.gif";
import { OnSubmit } from "../SignUpHandlers/SignUpHandlers";
import useFormData from "../pages/useFormData";
//https://storyset.com/ animatie ca sa nu uit
import Logo from "../../img/logo2-removebg-preview.png";

const RegistrationForm = ({ handleSubmit, loading, err, type }) => {
  const { register, handleSubmit: formHandleSubmit, errors } = useFormData();

  const handleEnterKeyPress = (e) => {
    if (e && e.key === "Enter") {
      e.preventDefault();
      formHandleSubmit(handleSubmit)();
    }
  };

  return (
    <div className="font-sans bg-grey-lighter flex flex-col w-full">
      <div className="bg-white-bg border-b">
        <div className="container-SignUp mx-auto px-4">
          <div className="navbar-items-Signup flex items-center justify-between py-4" style={{flexDirection:'row'}}>
            <div className="w-1/4 md:w-auto text-center text-2xl font-medium">
            <img src={Logo} alt="logo" className="Logo_Header" />
            </div>

            <div className="w-1/4 md:w-auto md:flex text-right">
              <Link to="/main"style={{ textDecoration: "none" }}>
          <button className="button-login">
            <svg
              className="login"
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              color="#000000"
            >
              <path
                d="M12 12h7m0 0l-3 3m3-3l-3-3M19 6V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-1"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            Home Page
          </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/2 bg-white">
          <img className="img-SingUp" src={animation} alt="" />
        </div>
        <div className="w-full md:w-1/2 bg-white">
          <div className="flex flex-col items-center pt-12">
            <h1 className="text-center" style={{overflow:'visible'}}>Sign Up</h1>
            {/* <form
              onSubmit={formHandleSubmit(OnSubmit)}
              id="form"
              className="w-full md:w-1/2 bg-white md:border shadow-lg px-8 pt-6 pb-8"
            > */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (Object.keys(errors).length === 0) {
                  formHandleSubmit(OnSubmit)();
                  handleSubmit(e);
                }
              }}
              id="form"
              className="w-full md:w-1/2 bg-white md:border shadow-lg px-8 pt-6 pb-8"
            >
              <InputField register={register} errors={errors} type={type} />

              <div className="mb-6">
                <AvatarUpload
                  register={register}
                  errors={errors}
                  className="rounded bg-grey-lighter border border-grey-lighter w-full py-2 px-3 mb-3 focus:outline-none focus:bg-white focus:border-grey"
                  type="password"
                />
              </div>

              <div className="flex items-center justify-between">
                <ActionButton
                  className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  disabled={loading}
                  text="Sign up"
                  onEnterKeyPress={handleEnterKeyPress}
                />
                <div className="inline-block ">
                  Already have an acount ?
                  <Link
                    className="inline-block "
                    style={{ marginLeft: "10px" }}
                    to="/login"
                  >
                    Signin
                  </Link>
                </div>
                <div>
                  {loading &&
                    "Uploading and compressing the image please wait..."}
                  {err && <span>Something went wrong</span>}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
