import React from "react";
import "../styles/styles.css";
import InputField from "../Components/InputField";
import AvatarUpload from "../Components/AvatarUpload";
import ActionButton from "../Components/ActionButton";
import { Link } from "react-router-dom";
import animation from "../../img/Messaging.gif";
//https://storyset.com/ animatie ca sa nu uit

const RegistrationForm = ({ handleSubmit, loading, err }) => {
  const handleEnterKeyPress = () => {
    handleSubmit();
  };

  return (
    <div className="font-sans bg-grey-lighter flex flex-col w-full">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="w-1/4 md:w-auto text-center text-2xl font-medium">
              logo
            </div>

            <div className="w-1/4 md:w-auto md:flex text-right">
              <div>Home-page</div>
              <div>About us</div>
              <div>Contact us</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/2 bg-white">
          <img className="opacity-75 pl-8 md:ml-32" src={animation} alt="" />
        </div>
        <div className="w-full md:w-1/2 bg-white">
          <div className="flex flex-col items-center pt-12">
            <h1 className="text-center">Sign U</h1>
            <h2 className="text-xl py-4">text</h2>
            <form
              onSubmit={handleSubmit}
              id="form"
              className="w-full md:w-1/2 bg-white md:border shadow-lg px-8 pt-6 pb-8"
            >
              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Name
                </label>
                <InputField
                  className="rounded bg-grey-lighter border border-grey-lighter w-full py-2 px-3 mb-3 focus:outline-none focus:bg-white focus:border-grey"
                  type="text"
                  placeholder="First name"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Email
                </label>
                <InputField
                  className="rounded bg-grey-lighter border border-grey-lighter w-full py-2 px-3 mb-3 focus:outline-none focus:bg-white focus:border-grey"
                  type="email"
                  placeholder="Email address"
                />
              </div>

              <div className="mb-6">
                <label
                  className="block text-grey-darker text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <InputField
                  className="rounded bg-grey-lighter border border-grey-lighter w-full py-2 px-3 mb-3 focus:outline-none focus:bg-white focus:border-grey"
                  type="password"
                  placeholder="Password"
                />
              </div>

              <div className="mb-6">
                <AvatarUpload
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
                <a className="inline-block ">
                  Already have an acount ?
                  <Link
                    className="inline-block "
                    style={{ marginLeft: "10px" }}
                    to="/login"
                  >
                    Signin
                  </Link>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
