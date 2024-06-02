import Button from "../components/Button";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import animation from "../../img/Texting (1).gif";
import { useTheme } from "../../context/dark-mode";
import useFormData from "../page/useFormData";
import InputErrorField from "../components/InputErrorField";
import Logo from "../../img/logo2-removebg-preview.png";

const LoginForm = ({ handleSubmit, loading, err }) => {
  const { register, handleSubmit: formHandleSubmit, errors } = useFormData();
  const { theme } = useTheme();

  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      formHandleSubmit(handleSubmit)();
    }
  };

  return (
    <div className={`font-sans bg-grey-lighter flex flex-col w-full ${theme}`}>
      <div className="bg-white-bg border-b">
        <div className="container-SignUp mx-auto px-4">
          <div
            className="navbar-items-Signup flex items-center justify-between py-4"
            style={{ flexDirection: "row" }}
          >
            <div className="w-1/4 md:w-auto text-center text-2xl font-medium">
              <img src={Logo} alt="logo" className="Logo_Header" />
            </div>

            <div className="w-1/4 md:w-auto md:flex text-right">
              <Link to="/main" style={{ textDecoration: "none" }}>
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
        <div
          className={`hidden md:block w-full md:w-1/2 bg-white ${theme}`}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
          }}
        >
          <img className="opacity-75 pl-8 md:ml-32" src={animation} alt="" />
        </div>
        <div className="w-full md:w-1/2 bg-white">
          <div className="flex flex-col items-center pt-12">
            <h1 className="text-center">Log in</h1>
            <form
              onSubmit={formHandleSubmit(handleSubmit)}
              className="w-full md:w-1/2 bg-white md:border shadow-lg px-8 pt-6 pb-8"
              style={{ overflow: "unset" }}
            >
              <InputErrorField
                register={register}
                errors={errors}
                id="email"
                type="email"
                placeholder="Email"
              />
              <InputErrorField
                register={register}
                errors={errors}
                id="password"
                type="password"
                placeholder="Password"
              />

              <div className="flex items-center justify-between">
                {/* <Button
                  className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}
                  onEnterKeyPress={handleEnterKeyPress}
                >
                  Log In
                </Button> */}
                <button
                  className="button-signup"
                  type="submit"
                  disabled={loading}
                  onEnterKeyPress={handleEnterKeyPress}
                  style={{width:'20%', background:'white',color:'black',justifyContent:'center'}}
                >
                  <svg
                    className="login"
                    width="24px"
                    height="24px"
                    stroke="black"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M18.723 21.788c-1.15-0.48-3.884-1.423-5.565-1.919-0.143-0.045-0.166-0.052-0.166-0.649 0-0.493 0.203-0.989 0.401-1.409 0.214-0.456 0.468-1.224 0.559-1.912 0.255-0.296 0.602-0.88 0.826-1.993 0.196-0.981 0.104-1.338-0.026-1.673-0.013-0.035-0.028-0.070-0.038-0.105-0.049-0.23 0.018-1.425 0.186-2.352 0.116-0.636-0.030-1.989-0.906-3.108-0.553-0.707-1.611-1.576-3.544-1.696l-1.060 0.001c-1.9 0.12-2.96 0.988-3.513 1.695-0.876 1.119-1.021 2.472-0.906 3.108 0.169 0.928 0.236 2.123 0.187 2.348-0.010 0.039-0.025 0.074-0.039 0.11-0.129 0.335-0.221 0.692-0.025 1.673 0.222 1.113 0.57 1.697 0.826 1.993 0.090 0.688 0.344 1.456 0.559 1.912 0.157 0.334 0.23 0.788 0.23 1.431 0 0.597-0.023 0.604-0.157 0.646-1.738 0.513-4.505 1.513-5.537 1.965-0.818 0.351-1.017 0.98-1.017 1.548s0 2.251 0 2.623c0 0.371 0.22 1.006 1.017 1.006 0.613 0 5.518 0 7.746 0 0.668 0 1.098 0 1.098 0h0.192c0 0 0.437 0 1.115 0 2.237 0 7.135 0 7.747 0 0.796 0 1.017-0.634 1.017-1.006s0-2.055 0-2.623-0.392-1.262-1.209-1.613zM18.876 25.98h-17.827v-2.579c0-0.318 0.092-0.46 0.388-0.587 0.994-0.435 3.741-1.426 5.434-1.926 0.889-0.282 0.889-1.070 0.889-1.646 0-0.801-0.106-1.397-0.331-1.878-0.172-0.366-0.392-1.022-0.468-1.601l-0.041-0.312-0.206-0.238c-0.113-0.13-0.396-0.538-0.59-1.513-0.153-0.759-0.085-0.935-0.031-1.076 0.031-0.076 0.058-0.152 0.081-0.237l0.005-0.022 0.005-0.022c0.105-0.495-0.037-1.962-0.181-2.755-0.067-0.365 0.017-1.401 0.7-2.273 0.418-0.534 1.229-1.19 2.722-1.293l0.992-0.001c1.219 0.083 2.145 0.518 2.752 1.294 0.682 0.872 0.766 1.909 0.7 2.275-0.148 0.814-0.287 2.257-0.180 2.758l0.008 0.039 0.011 0.038c0.016 0.054 0.036 0.108 0.056 0.161l0.009 0.026 0.001 0.002c0.059 0.153 0.127 0.326-0.024 1.087-0.196 0.974-0.479 1.384-0.592 1.515l-0.204 0.237-0.042 0.31c-0.076 0.578-0.296 1.237-0.468 1.603-0.247 0.525-0.5 1.157-0.5 1.856 0 0.577 0 1.367 0.918 1.655 1.641 0.485 4.345 1.416 5.448 1.877 0.418 0.179 0.574 0.493 0.574 0.649l-0.006 2.579z"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Log In
                </button>
                <a className="inline-block ">
                  Don't have an account ?
                  <Link
                    className="inline-block "
                    style={{ marginLeft: "10px" }}
                    to="/signup"
                  >
                    Sign up
                  </Link>
                </a>
                <div>
                  {loading && "Logging in, please wait..."}
                  {err && (
                    <span>
                      Email or password is incorrect. Please try again.
                    </span>
                  )}
                </div>
              </div>
            </form>
            {err && <p className="text-red-500 mt-4">{err}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
