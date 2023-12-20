import Button from "../components/Button";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import animation from "../../img/Texting (1).gif";
import { useTheme } from "../../context/dark-mode";
import useFormData from "../page/useFormData";
import InputErrorField from "../components/InputErrorField";

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
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="w-1/4 md:w-auto text-center text-2xl font-medium">
              Logo
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
            <h2 className="text-xl py-4">text</h2>
            <form onSubmit={formHandleSubmit(handleSubmit)}
  className="w-full md:w-1/2 bg-white md:border shadow-lg px-8 pt-6 pb-8"
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
                <Button
                  className="bg-green hover:bg-green-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}
                  onEnterKeyPress={handleEnterKeyPress}
                >
                  Log In
                </Button>
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
