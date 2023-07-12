import Dashboard from "./Dashboard";
import Ingestion from "./Ingestion";
import TopBar from "./TopBar";

import { Route, Routes, Navigate } from "react-router-dom";

const Main = (props) => {
  return (
    <div className="grow mt-4 mx-12">
      <TopBar
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ingestion" element={<Ingestion />} />
        {/* <IngestionStart /> */}
        {/* <IngestionMetadata /> */}
      </Routes>
    </div>
  );
};

export default Main;
