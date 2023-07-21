import Dashboard from "./Dashboard";
import Ingestion from "./Ingestion";
import DataManagement from "./DataManagement";
import TopBar from "./TopBar";

import { Route, Routes, Navigate, Outlet } from "react-router-dom";

const MainPage = (props) => {
  return (
    <div className="grow mt-4 mx-12">
      <TopBar
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
      />
      <Routes>
        <Route path="/" element={<Dashboard tabs={props.tabs} />} />
        <Route path="/data-management" element={<DataManagement />} />
        <Route path="/data-management/ingestion" element={<Ingestion />} />
      </Routes>
    </div>
  );
};

export default MainPage;
