import { Outlet, Navigate } from "react-router-dom";
import LeftNav from "./LeftNav";
import TopBar from "./TopBar";

const RootLayout = (props) => {
  return (
    <div className="w-screen h-full sm:h-screen bg-backgroundLight dark:bg-backgroundDark flex flex-col md:flex-row  z-0">
      <LeftNav
        tabs={props.tabs}
        setDUMMY_LOGGED_IN={props.setDUMMY_LOGGED_IN}
      />
      <div className="grow mt-20 sm:mt-24 lg:mt-4 w-72 sm:w-[560px] md:w-[650px] lg:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto xl:mx-12">
        <TopBar
          isDarkMode={props.isDarkMode}
          setIsDarkMode={props.setIsDarkMode}
        />
        {/* <Outlet /> */}
        {props.DUMMY_LOGGED_IN ? <Outlet /> : <Navigate to="/login" />}
      </div>
    </div>
  );
};

export default RootLayout;
