import { Outlet, Navigate } from "react-router-dom";
import LeftNav from "./LeftNav";
import TopBar from "./TopBar";
import ErrorModal from "./ErrorModal";
import { useEffect } from "react";

import { useLocation } from "react-router-dom";

const RootLayout = (props) => {
  // const flag = props.hasJWT();
  // console.log(flag, "👽");

  // remove error modal on route change
  let location = useLocation();

  useEffect(() => {
    props.setHasError(false);
  }, [location]);

  return (
    <div className="w-screen h-full sm:h-screen bg-backgroundLight dark:bg-backgroundDark flex flex-col md:flex-row  z-0">
      <ErrorModal
        hasError={props.hasError}
        setHasError={props.setHasError}
        errorMessage={props.errorMessage}
        errorOffsetType={props.errorOffsetType}
      />
      <LeftNav
        tabs={props.tabs}
        setDUMMY_LOGGED_IN={props.setDUMMY_LOGGED_IN}
        setIsLoggedIn={props.setIsLoggedIn}
      />
      <div className="grow mt-20 sm:mt-24 lg:mt-4 w-72 sm:w-[560px] md:w-[650px] lg:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto xl:mx-12">
        <TopBar
          isDarkMode={props.isDarkMode}
          setIsDarkMode={props.setIsDarkMode}
          name={props.name}
        />
        {/* <Outlet /> */}
        {/* {props.DUMMY_LOGGED_IN ? <Outlet /> : <Navigate to="/login" />} */}
        {/* {props.loggedInBool ? <Outlet /> : <Navigate to="/login" />} */}
        {props.isLoggedIn ? <Outlet /> : <Navigate to="/login" />}
        {/* <Outlet /> */}
      </div>
    </div>
  );
};

export default RootLayout;
