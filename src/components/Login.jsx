import { useState } from "react";
import { Navigate } from "react-router-dom";
import Switch from "react-switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import LoadScreen from "./LoadScreen";

const Login = (props) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleDarkModeSwitch = () => {
    props.setIsDarkMode((prevState) => {
      localStorage.setItem("darkMode", JSON.stringify(!prevState));
      return !prevState;
    });
  };

  // console.log("errors", errors);

  // const flag = props.hasJWT();

  const onSubmit = async (data) => {
    // console.log(data);
    setIsLoggingIn(true);
    console.log(
      data,
      `starting login request with username: ${data.username} and password: ${data.password}`
    );
    const response = await fetch(
      `http://localhost:8000/user/login?username=${data.username}&password=${data.password}`,
      {
        method: "POST",
        headers: {
          Accept: "application.json",
          // "Content-Type": "application/json",
        },
        // mode: "no-cors",
      }
    );

    if (!response.ok) {
      console.error("error with fetch!");
      alert("incorrect login credentials");
      setIsLoggingIn(false);
      return;
    }
    const dataAPI = await response.json();
    console.log(dataAPI, "😂");
    const token = dataAPI.access_token;
    localStorage.setItem("jwt", token);
    props.setIsLoggedIn(true);
    // props.setDUMMY_LOGGED_IN(true);

    // setTimeout(() => {
    //   props.setDUMMY_LOGGED_IN(true);
    // }, 1500);
  };

  // if (props.DUMMY_LOGGED_IN) {
  // if (props.loggedInBool) {
  if (props.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-screen h-screen text-blackTextLight dark:text-white bg-backgroundLight dark:bg-backgroundDark">
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
            {/* <label htmlFor="">Username</label> */}
            {/* {errors.username && ( */}
            <p
              className={`text-xs text-error dark:text-salmonRed ${
                errors.username ? "" : "opacity-0"
              }`}
            >
              Please enter username
            </p>
            {/* )} */}
            <input
              {...register("username", { required: true })}
              placeholder="Username"
              type="text"
              className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 border-blackTextLight dark:border-white rounded`}
            />
          </div>
          <div className="mt-2">
            {/* <label htmlFor="">Password</label> */}
            {/* {errors.password && ( */}
            <p
              className={`text-xs text-error dark:text-salmonRed ${
                errors.password ? "" : "opacity-0"
              }`}
            >
              Please enter password
            </p>
            {/* )} */}
            <input
              {...register("password", { required: true })}
              placeholder="Password"
              type="text"
              className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 border-blackTextLight dark:border-white rounded`}
            />
          </div>
          {isLoggingIn ? (
            <LoadScreen marginTop="8" />
          ) : (
            <input
              type="submit"
              value="Log In"
              className="px-8 py-4 mt-8 border-2 border-black bg-lilacBlue disabled:opacity-50 text-blackTextLight "
              // onClick={buttonClickHandler}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
