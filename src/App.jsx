import { useState } from "react";
import "./App.css";
import LeftNav from "./components/LeftNav";
import TopBar from "./components/TopBar";
import Main from "./components/Main";

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
} from "@fortawesome/free-solid-svg-icons";

import { faFaceSmile, faFileLines } from "@fortawesome/free-regular-svg-icons";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
      ],
    },
    {
      name: "Data Processing",
      path: "/processing",
      icon: "gears",
      color: "lilacBlue",

      description: "Tools for per-processing data",
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
  ];

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
    faFileLines
  );

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="w-screen h-max bg-backgroundLight dark:bg-backgroundDark flex z-0">
        <LeftNav tabs={DUMMY_AVAILABLE_TABS} />
        <Main
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          tabs={DUMMY_AVAILABLE_TABS}
        />
      </div>
    </div>
  );
}

export default App;
