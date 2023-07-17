import { Link } from "react-router-dom";

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

import Pencil from "../icons/Pencil";
import SyringeSmall from "../icons/SyringeSmall";

const LeftNav = (props) => {
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
                <div className="h-10 ml-6 pl-4 flex items-center gap-x-3 rounded hover:bg-cardLight dark:hover:bg-cardDark">
                  <FontAwesomeIcon icon={subtab.icon} size="sm" />
                  <p className="text-xs">{subtab.name}</p>
                </div>
              </Link>
            );
          })}
      </div>
    );
  });

  return (
    // <div className="bg-white dark:bg-sidebarDark xl:w-60 xl:h-screen text-white">
    <div className="bg-white dark:bg-sidebarDark w-64 h-screen text-blackTextLight dark:text-white">
      <div className=" px-4">
        <Link to="/">
          <h1 className="text-5xl font-bold pt-6 text-center">ComPsy</h1>
        </Link>
        <div className="mt-8">
          {tabs}
          {/* <div className="mt-4">
            <div className="flex items-center gap-x-4 text-base font-semibold">
              <FontAwesomeIcon icon={faDatabase} size="lg" />
              <p className="text-lg">Main</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-x-4 text-base font-semibold">
              <Pencil />
              <p className="text-lg">Main</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-x-4 text-base font-semibold">
              <Pencil />
              <p className="text-lg">Main</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
