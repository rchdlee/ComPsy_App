import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faSyringe,
  faMagnifyingGlass,
  faPen,
  faScissors,
  faStethoscope,
  faGears,
} from "@fortawesome/free-solid-svg-icons";

import Pencil from "../icons/Pencil";
import SyringeSmall from "../icons/SyringeSmall";

const LeftNav = () => {
  const DUMMY_AVAILABLE_TABS = [
    {
      name: "Data Management",
      path: "/datamanagement",
      icon: faDatabase,
      subTabs: [
        { name: "Ingestion", path: "/ingestion", icon: faSyringe },
        { name: "Query", path: "/query", icon: faMagnifyingGlass },
      ],
    },
    {
      name: "Data Annotation",
      path: "/annotation",
      icon: faPen,
      subTabs: [
        { name: "Timestamps", path: "/timestamps", icon: faScissors },
        {
          name: "Quality Control",
          path: "/qualitycontrol",
          icon: faStethoscope,
        },
      ],
    },
    {
      name: "Data Processing",
      path: "/processing",
      icon: faGears,
      subTabs: [],
    },
  ];

  // maybe change from single import to global svg import?
  // subtab link path should add onto main tab path
  const tabs = DUMMY_AVAILABLE_TABS.map((tab) => {
    return (
      <div className="mt-6" key={tab.name}>
        <Link to={tab.path}>
          <div className="flex items-center gap-x-4 font-semibold hover:underline underline-offset-2">
            <FontAwesomeIcon icon={tab.icon} size="lg" />
            <p className="text-sm">{tab.name}</p>
          </div>
        </Link>
        {tab.subTabs.length > 0 &&
          tab.subTabs.map((subtab) => {
            return (
              <Link to={subtab.path} key={subtab.name}>
                <div className="flex items-center gap-x-3 ml-6 mt-3 hover:underline underline-offset-2">
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
    <div className="bg-white dark:bg-sidebarDark w-60 h-screen text-white">
      <div className=" px-6">
        <Link to="/">
          <h1 className="text-5xl font-bold pt-6 text-center">ComPsy</h1>
        </Link>
        <div className="mt-8 ml-2">
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
