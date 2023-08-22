import { useEffect, useState } from "react";
import "./App.css";
import LeftNav from "./components/LeftNav";
import MainPage from "./components/MainPage";

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
} from "@fortawesome/free-solid-svg-icons";

import {
  faFaceSmile,
  faFileLines,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Error from "./components/Error";

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
    faXmark
  );
  const savedIsDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode);
  // const [DUMMY_LOGGED_IN, setDUMMY_LOGGED_IN] = useState(false);

  const [name, setName] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
            // setDUMMY_LOGGED_IN(false);
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
      // console.log(flag, "🤑");
      // return flag;
    };
    hasJWT();
  });

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const throwNewErrorModal = (message) => {
    setHasError(true);
    setErrorMessage(message);
  };

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
          // DUMMY_LOGGED_IN={DUMMY_LOGGED_IN}
          // setDUMMY_LOGGED_IN={setDUMMY_LOGGED_IN}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          // hasJWT={hasJWT}
          // loggedInBool={loggedInBool}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          name={name}
          hasError={hasError}
          setHasError={setHasError}
          errorMessage={errorMessage}
        />
      ),
      errorElement: (
        <Error
          tabs={DUMMY_AVAILABLE_TABS}
          // DUMMY_LOGGED_IN={DUMMY_LOGGED_IN}
          // setDUMMY_LOGGED_IN={setDUMMY_LOGGED_IN}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
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
          // DUMMY_LOGGED_IN={DUMMY_LOGGED_IN}
          // setDUMMY_LOGGED_IN={setDUMMY_LOGGED_IN}
          // hasJWT={hasJWT}
          // loggedInBool={loggedInBool}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ),
    },
  ]);

  // if (isLoggedIn) {
  //   return <Navigate to="/" />;
  // }
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <RouterProvider router={router} />
      {/* <Routes>
        <Route element={<PrivateRoutes DUMMY_LOGGED_IN={DUMMY_LOGGED_IN} />}>
          <Route
            element={
              <Home
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                setDUMMY_LOGGED_IN={setDUMMY_LOGGED_IN}
              />
            }
            path="*"
          />
        </Route>
        <Route
          path="/login"
          element={
            <Login
              DUMMY_LOGGED_IN={DUMMY_LOGGED_IN}
              setDUMMY_LOGGED_IN={setDUMMY_LOGGED_IN}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />
      </Routes> */}

      {/* <div className="w-screen h-max bg-backgroundLight dark:bg-backgroundDark flex z-0">
        <LeftNav tabs={DUMMY_AVAILABLE_TABS} /> */}

      {/* <div className="grow mt-4 mx-12">
          <TopBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
          <Routes>
            <Route
              path="/home"
              element={<Dashboard tabs={DUMMY_AVAILABLE_TABS} />}
            />
            <Route path="/data-management" element={<DataManagement />} />
            <Route path="/data-management/ingestion" element={<Ingestion />} />
          </Routes>
        </div> */}

      {/* <MainPage
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          tabs={DUMMY_AVAILABLE_TABS}
        />
      </div> */}
    </div>
  );
}

export default App;
