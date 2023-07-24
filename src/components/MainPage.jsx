import Dashboard from "./Dashboard";
import Ingestion from "./Ingestion";
import DataManagement from "./DataManagement";
import TopBar from "./TopBar";

import { Route, Routes, Navigate, Outlet } from "react-router-dom";

const MainPage = (props) => {
  return (
    // <div className="grow mt-20 sm:mt-24 xl:mt-4 mx-16 md:mx-32 lg:mx-16 lg:w-[650px] xl:mx-12">
    <div className="grow mt-20 sm:mt-24 lg:mt-4 w-72 sm:w-[560px] md:w-[650px] lg:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto xl:mx-12">
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
