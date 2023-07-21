import { Navigate } from "react-router-dom";
import Switch from "react-switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = (props) => {
  if (props.DUMMY_LOGGED_IN) {
    // console.log('user is already logged in');
    return <Navigate to="/" />;
  }

  const buttonClickHandler = () => {
    console.log("log int!!");
    props.setDUMMY_LOGGED_IN(true);
  };

  const handleDarkModeSwitch = () => {
    props.setIsDarkMode((prevState) => !prevState);
  };

  return (
    <div className="w-screen h-screen text-blackTextLight dark:text-white bg-backgroundLight dark:bg-backgroundDark">
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
      <div className="w-80 h-96 bg-cardLight dark:bg-cardDark">
        <h4>Login:</h4>
        <form action="">
          <div>
            <label htmlFor="">Username</label>
            <input
              type="text"
              className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 border-blackTextLight dark:border-white rounded`}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              type="text"
              className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 border-blackTextLight dark:border-white rounded`}
            />
          </div>
        </form>
        <button
          className="px-8 py-4 border-2 border-black mt-4 ml-24 bg-lilacBlue disabled:opacity-50 disabled:cursor-not-allowed text-blackTextLight "
          onClick={buttonClickHandler}
        >
          trtra
        </button>
      </div>
    </div>
  );
};

export default Login;
