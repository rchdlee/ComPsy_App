import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faDatabase,
//   faSyringe,
//   faMagnifyingGlass,
//   faPen,
//   faScissors,
//   faStethoscope,
//   faGears,
// } from "@fortawesome/free-solid-svg-icons";

// import Pencil from "../icons/Pencil";
// import SyringeSmall from "../icons/SyringeSmall";

const LeftNav = (props) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const DUMMY_AVAILABLE_TABS = props.tabs;

  // maybe change from single import to global svg import?
  // subtab link path should add onto main tab path
  const tabs = DUMMY_AVAILABLE_TABS.map((tab) => {
    return (
      <div className="" key={tab.name}>
        <Link to={tab.path}>
          {/* <div className="flex items-center gap-x-4 font-semibold hover:underline underline-offset-2"> */}
          <div className="w-56 h-14 flex items-center justify-start gap-x-4 font-semibold  pl-4 pr-2 py-4 hover:bg-cardLight dark:hover:bg-cardDark rounded">
            <FontAwesomeIcon icon={tab.icon} size="lg" />
            <p className="text-sm">{tab.name}</p>
          </div>
        </Link>
        {tab.subTabs.length > 0 &&
          tab.subTabs.map((subtab) => {
            return (
              <Link to={tab.path + subtab.path} key={subtab.name}>
                <div className="h-8 mb-0.5 ml-6 pl-4 flex items-center gap-x-3 rounded hover:bg-cardLight dark:hover:bg-cardDark">
                  <FontAwesomeIcon icon={subtab.icon} size="sm" />
                  <p className="text-xs">{subtab.name}</p>
                </div>
              </Link>
            );
          })}
      </div>
    );
  });

  const logoutHandler = () => {
    // props.setDUMMY_LOGGED_IN(false);
    localStorage.removeItem("jwt");
    props.setIsLoggedIn(false);
  };

  const menuOpenHandler = () => {
    console.log("menu opened!");
    setMenuIsOpen(true);

    // disable scroll when mobile menu is open
    const topScroll = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(0, topScroll);
    };
  };

  const menuCloseHandler = () => {
    setMenuIsOpen(false);

    // re-enable scroll on close
    window.onscroll = function () {};
  };

  return (
    // <div className="bg-white dark:bg-sidebarDark xl:w-60 xl:h-screen text-white">
    <div className="relative">
      <div className="lg:hidden bg-backgroundLight dark:bg-backgroundDark border-b-2 border-blackTextLight dark:border-white w-screen fixed z-40">
        <FontAwesomeIcon
          icon="bars"
          size="2xl"
          className="text-blackTextLight dark:text-white mt-6 ml-6 mb-4"
          onClick={menuOpenHandler}
        />
      </div>
      <div
        className={`absolute ${
          menuIsOpen ? "translate-x-full -left-64" : "-left-64"
        } lg:static top-0 transition-transform duration-300 flex flex-col justify-between bg-white dark:bg-sidebarDark w-64 h-screen text-blackTextLight dark:text-white z-40`}
      >
        <div className=" px-4">
          {/* <div className="flex items-center flex-row-reverse justify-center gap-4 mt-4"> */}
          {/* <div> */}
          <div className="flex justify-end mt-6 mr-2 lg:hidden">
            <FontAwesomeIcon icon="x" size="xl" onClick={menuCloseHandler} />
          </div>
          <Link to="/">
            <h1 className="text-5xl font-bold mt-2 pt-2 lg:pt-6 text-center">
              ComPsy
            </h1>
          </Link>
          {/* </div> */}
          <div className="mt-6 xl:mt-8">{tabs}</div>
        </div>
        <div className="flex justify-end mb-4 mr-4">
          <div
            onClick={logoutHandler}
            className="w-28 px-4 py-3 rounded flex items-center justify-around  hover:bg-cardLight dark:hover:bg-cardDark"
          >
            <button className="text-sm">Logout</button>
            <FontAwesomeIcon icon="arrow-right-from-bracket" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
