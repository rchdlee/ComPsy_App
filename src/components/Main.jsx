import Dashboard from "./Dashboard";
import IngestionMetadata from "./IngestionMetadata";
import IngestionMetadataTest from "./IngestionMetadataTest";
import IngestionStart from "./IngestionStart";
import TopBar from "./TopBar";

const Main = (props) => {
  return (
    <div className="grow mt-4 mx-12">
      <TopBar
        isDarkMode={props.isDarkMode}
        setIsDarkMode={props.setIsDarkMode}
      />
      {/* <Dashboard /> */}
      {/* <IngestionStart /> */}
      <IngestionMetadata />
      {/* <IngestionMetadataTest /> */}
    </div>
  );
};

export default Main;
