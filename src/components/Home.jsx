import LeftNav from "./LeftNav";
import MainPage from "./MainPage";

const Home = (props) => {
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

  return (
    <div className="w-screen h-full sm:h-screen bg-backgroundLight dark:bg-backgroundDark flex flex-col md:flex-row  z-0">
      <LeftNav
        tabs={DUMMY_AVAILABLE_TABS}
        setDUMMY_LOGGED_IN={props.setDUMMY_LOGGED_IN}
      />

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

      <MainPage
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
        tabs={DUMMY_AVAILABLE_TABS}
      />
      {/* <div className="h-24 bg-backgroundLight dark:bg-backgroundDark"></div> */}
    </div>
  );
};

export default Home;
