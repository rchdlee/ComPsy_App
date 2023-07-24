import { useState } from "react";
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
} from "@fortawesome/free-solid-svg-icons";

import { faFaceSmile, faFileLines } from "@fortawesome/free-regular-svg-icons";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import PrivateRoutes from "./components/PrivateRoutes";

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
    faX
  );
  const savedIsDarkMode = JSON.parse(localStorage.getItem("darkMode"));
  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode);
  const [DUMMY_LOGGED_IN, setDUMMY_LOGGED_IN] = useState(true);

  // const DUMMY_AVAILABLE_TABS = [
  //   {
  //     name: "Data Management",
  //     path: "/data-management",
  //     icon: "database",
  //     color: "lilacBlue",
  //     description: "Tools for data ingestion, querying, sampling, and editing",
  //     subTabs: [
  //       { name: "Ingestion", path: "/ingestion", icon: "syringe" },
  //       { name: "Query", path: "/query", icon: "magnifying-glass" },
  //     ],
  //   },
  //   {
  //     name: "Data Annotation",
  //     path: "/annotation",
  //     icon: "pen",
  //     color: "lilacBlue",

  //     description: "Tools for annotations such as timestamps, QC, and labels",
  //     subTabs: [
  //       { name: "Timestamps", path: "/timestamps", icon: "scissors" },
  //       {
  //         name: "Quality Control",
  //         path: "/qualitycontrol",
  //         icon: "stethoscope",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Data Processing",
  //     path: "/processing",
  //     icon: "gears",
  //     color: "lilacBlue",

  //     description: "Tools for per-processing data",
  //     subTabs: [],
  //   },
  //   {
  //     name: "Research Management",
  //     path: "/management",
  //     icon: "atom",
  //     color: "salmonRed",

  //     description: "Tools for creating and editing research projects",
  //     subTabs: [],
  //   },
  // ];

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <Routes>
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
      </Routes>

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
