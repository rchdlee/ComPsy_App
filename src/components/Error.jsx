import LeftNav from "./LeftNav";
import TopBar from "./TopBar";

import { Link, useLocation } from "react-router-dom";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Error = (props) => {
  const handleDarkModeSwitch = () => {
    props.setIsDarkMode((prevState) => {
      localStorage.setItem("darkMode", !prevState);
      return !prevState;
    });
  };

  return (
    <div className="w-screen h-full sm:h-screen bg-backgroundLight dark:bg-backgroundDark flex flex-col md:flex-row  z-0">
      <LeftNav
        tabs={props.tabs}
        setDUMMY_LOGGED_IN={props.setDUMMY_LOGGED_IN}
      />
      <div className="grow mt-20 sm:mt-24 lg:mt-4 w-72 sm:w-[560px] md:w-[650px] lg:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto xl:mx-12">
        {/* <div className="md:w-[650px] lg:w-[650px] xl:w-[915px] 2xl:w-[1050px] flex justify-between mx-auto mt-2">
          <div className="text-sm text-darkTextLight dark:text-white flex items-center gap-2">
            <Link to="/">
              <div className="flex items-center gap-2 hover:underline underline-offset-2">
                <FontAwesomeIcon icon="house" />
                <p>Home</p>
              </div>
            </Link>
          </div>
          <div className="flex gap-x-8 items-center">
            <div className="hidden sm:flex items-center gap-x-3 rounded-full px-4 py-2 bg-cardLight dark:bg-cardDark">
              <div className="bg-white p-1 rounded-full w-7 h-7 flex justify-center items-center">
                <FontAwesomeIcon
                  icon={["far", "face-smile"]}
                  className="h-5 "
                />
              </div>
              <p className="text-darkTextLight dark:text-white text-sm xl:text-base">
                {props.name}
              </p>
            </div>
            <Switch
              onChange={handleDarkModeSwitch}
              // checked={props.isDarkMode}
              checked={false}
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
        </div> */}
        {/* <Outlet /> */}
        <div className="text-center text-blackTextLight dark:text-white mt-20">
          <h1 className="text-2xl text-center mt-16">There was an error!</h1>
          <p className="mt-4">Page not found</p>
          <div className="flex gap-1 items-center justify-center">
            <p className="mt-4">Please return</p>
            <Link to="/" className="mt-4 underline hover:font-bold">
              {" "}
              home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
