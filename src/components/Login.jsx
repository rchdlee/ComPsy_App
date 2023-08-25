import { useState } from "react";
import { Navigate } from "react-router-dom";
import Switch from "react-switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import LoadScreen from "./LoadScreen";
import ErrorModal from "./ErrorModal";

const Login = (props) => {
  // Login State -- should this be like this, or something different?
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  //

  // Password visibility state
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  //

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //

  // Login Screen Dark Mode Switch
  const handleDarkModeSwitch = () => {
    props.setIsDarkMode((prevState) => {
      localStorage.setItem("darkMode", JSON.stringify(!prevState));
      return !prevState;
    });
  };
  //

  // Login Button Logic
  const onSubmit = async (data) => {
    setIsLoggingIn(true);

    const response = await fetch(
      `http://localhost:8000/user/login?username=${data.username}&password=${data.password}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
        },
      }
    );

    if (!response.ok) {
      props.throwNewErrorModal(
        "Incorrect login credentials. Please try again",
        "login"
      );
      setIsLoggingIn(false);
      return;
    }
    const dataAPI = await response.json();
    console.log(dataAPI, "😂");
    const token = dataAPI.access_token;
    localStorage.setItem("jwt", token);
    props.setIsLoggedIn(true);
  };
  if (props.isLoggedIn) {
    return <Navigate to="/" />;
  }
  //

  // Toggle Password Input Visibility
  const passwordVisibilityHandler = () => {
    setPasswordIsVisible((prevState) => !prevState);
  };
  //

  return (
    <div className="w-screen h-screen text-blackTextLight dark:text-white bg-backgroundLight dark:bg-backgroundDark">
      <ErrorModal
        hasError={props.hasError}
        setHasError={props.setHasError}
        errorMessage={props.errorMessage}
        errorOffsetType={props.errorOffsetType}
      />
      <div className="flex justify-end pr-12 pt-8">
        <Switch
          onChange={handleDarkModeSwitch}
          checked={props.isDarkMode}
          height={32}
          width={64}
          activeBoxShadow="0 0 2px 3px #5d5d5d"
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#a9daf0"
          onHandleColor="#25b6f4"
          offColor="#f2e5ae"
          offHandleColor="#f4ca25"
          checkedHandleIcon={
            <div className="flex justify-center items-center h-full text-white">
              <FontAwesomeIcon icon="moon" />
            </div>
          }
          uncheckedHandleIcon={
            <div className="flex justify-center items-center h-full text-blackTextLight">
              <FontAwesomeIcon icon="sun" />
            </div>
          }
        />
      </div>
      <div className="w-80 h-96 bg-cardLight dark:bg-cardDark mx-auto mt-32">
        <h4 className="text-5xl font-bold text-center pt-10">ComPsy</h4>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center mt-5"
        >
          <div>
            <p
              className={`text-xs text-error dark:text-salmonRed ${
                errors.username ? "" : "opacity-0"
              }`}
            >
              Please enter username
            </p>
            <input
              {...register("username", { required: true })}
              placeholder="Username"
              type="text"
              className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 border-blackTextLight dark:border-white rounded`}
              autoComplete="off"
            />
          </div>
          <div className="mt-2 relative">
            <p
              className={`text-xs text-error dark:text-salmonRed ${
                errors.password ? "" : "opacity-0"
              }`}
            >
              Please enter password
            </p>
            <input
              {...register("password", { required: true })}
              placeholder="Password"
              type={passwordIsVisible ? "text" : "password"}
              className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 border-blackTextLight dark:border-white rounded`}
              autoComplete="off"
            />
            <div
              className="absolute right-3 top-7"
              onClick={passwordVisibilityHandler}
            >
              {passwordIsVisible ? (
                <FontAwesomeIcon icon="eye-slash" />
              ) : (
                <FontAwesomeIcon icon="eye" />
              )}
            </div>
          </div>
          {isLoggingIn ? (
            <LoadScreen marginTop="8" />
          ) : (
            <input
              type="submit"
              value="Log In"
              className="px-8 py-4 mt-8 border-2 border-black bg-lilacBlue disabled:opacity-50 text-blackTextLight "
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
