import { useEffect, useState } from "react";
import "./App.css";
import LeftNav from "./components/LeftNav";

import Dashboard from "./components/Dashboard";
import Ingestion from "./components/Ingestion";
import DataManagement from "./components/DataManagement";
import TopBar from "./components/TopBar";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faDatabase,
  faSyringe,
  faMagnifyingGlass,
  faPen,
  faScissors,
  faStethoscope,
  faGears,
  faAtom,
  faSun,
  faMoon,
  faHouse,
  faArrowRightFromBracket,
  faBars,
  faX,
  faChartPie,
  faScrewdriverWrench,
  faFilter,
  faTags,
  faHandsAslInterpreting,
  faFolder,
  faChevronRight,
  faTriangleExclamation,
  faXmark,
  faEye,
  faEyeSlash,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFaceSmile,
  faFileLines,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Error from "./components/Error";

import { useLocation } from "react-router-dom";

function App() {
  library.add(
    faDatabase,
    faSyringe,
    faMagnifyingGlass,
    faPen,
    faScissors,
    faStethoscope,
    faGears,
    faAtom,
    faSun,
    faMoon,
    faFaceSmile,
    faHouse,
    faFileLines,
    faArrowRightFromBracket,
    faBars,
    faX,
    faChartPie,
    faScrewdriverWrench,
    faFilter,
    faTags,
    faFolder,
    faChevronRight,
    faCircleXmark,
    faTriangleExclamation,
    faXmark,
    faEye,
    faEyeSlash,
    faCheck
  );

  // DARK MODE //
  const savedIsDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode);
  //

  // LOGIN //
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState();
  //

  // ERROR STATE
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorOffsetType, setErrorOffsetType] = useState("login");
  //

  // Check if JWT in cookies is valid - keeping user logged in on refresh //
  useEffect(() => {
    const hasJWT = () => {
      // let flag = false;
      const testJWT = localStorage.getItem("jwt");
      // console.log(testJWT, "🤩");
      if (testJWT) {
        const getSelf = async () => {
          const response = await fetch("http://localhost:8000/user/get_self", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${testJWT}`,
            },
          });
          if (!response.ok) {
            return;
          }
          const data = await response.json();
          console.log(data, "🐱‍🐉");
          const name = `${data.first_name} ${data.last_name}`;
          setName(name);
          localStorage.setItem("selfID", data.id);
          setIsLoggedIn(true);
        };
        getSelf();
      }
    };
    hasJWT();
  });
  //

  // function to throw a new error popup //
  const throwNewErrorModal = (message, type) => {
    setHasError(false);
    setErrorOffsetType(type);
    setTimeout(() => {
      setHasError(true);
      setErrorMessage(message);
    }, 200);
  };
  //

  // DASHBOARD AVAILABLE ITEMS // -- replace with API soon
  const DUMMY_AVAILABLE_TABS = [
    {
      name: "Data Management",
      path: "/data-management",
      icon: "database",
      color: "lilacBlue",
      description: "Tools for data ingestion, querying, sampling, and editing",
      subTabs: [
        { name: "Ingestion", path: "/ingestion", icon: "syringe" },
        { name: "Query", path: "/query", icon: "magnifying-glass" },
        { name: "Curation", path: "/curation", icon: "filter" },
      ],
    },
    {
      name: "Data Annotation",
      path: "/annotation",
      icon: "pen",
      color: "lilacBlue",

      description: "Tools for annotations such as timestamps, QC, and labels",
      subTabs: [
        { name: "Timestamps", path: "/timestamps", icon: "scissors" },
        {
          name: "Quality Control",
          path: "/qualitycontrol",
          icon: "stethoscope",
        },
        {
          name: "Labels",
          path: "/labels",
          icon: "tags",
        },
      ],
    },
    {
      name: "Data Processing",
      path: "/processing",
      icon: "gears",
      color: "lilacBlue",

      description: "Tools for pre-processing and analyzing data",
      subTabs: [],
    },
    {
      name: "Research Management",
      path: "/management",
      icon: "atom",
      color: "salmonRed",

      description: "Tools for creating and editing research projects",
      subTabs: [],
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "chart-pie",
      color: "salmonRed",

      description: "Charts, statistics, and visualization",
      subTabs: [],
    },
    {
      name: "Tools",
      path: "/tools",
      icon: "screwdriver-wrench",
      color: "salmonRed",

      description: "Data dictionary, data release, API",
      subTabs: [],
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <RootLayout
          tabs={DUMMY_AVAILABLE_TABS}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          name={name}
          hasError={hasError}
          setHasError={setHasError}
          errorMessage={errorMessage}
          errorOffsetType={errorOffsetType}
        />
      ),
      errorElement: (
        <Error
          tabs={DUMMY_AVAILABLE_TABS}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          name={name}
        />
      ),
      children: [
        {
          index: true,
          element: <Dashboard tabs={DUMMY_AVAILABLE_TABS} />,
        },
        {
          path: "/data-management",
          element: <DataManagement />,
        },
        {
          path: "data-management/ingestion",
          element: (
            <Ingestion
              throwNewErrorModal={throwNewErrorModal}
              setHasError={setHasError}
            />
          ),
        },
      ],
    },
    {
      path: "login",
      element: (
        <Login
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          hasError={hasError}
          setHasError={setHasError}
          errorMessage={errorMessage}
          throwNewErrorModal={throwNewErrorModal}
          errorOffsetType={errorOffsetType}
        />
      ),
    },
  ]);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
