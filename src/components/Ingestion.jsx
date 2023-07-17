import IngestionStart from "./IngestionStart";
import IngestionMetadata from "./IngestionMetadata";
import LoadScreen from "./LoadScreen";
import { useState } from "react";
import { useEffect } from "react";

const Ingestion = () => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [availableStudies, setAvailableStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [filePaths, setFilePaths] = useState(null);
  const [metadata, setMetadata] = useState(null);

  // console.log(metadata, "😋");
  const DUMMY_AVAILABLE_STUDIES = [
    "Study 1",
    "Study 2",
    "Social Coordination",
    "Study 4",
    "Study 5",
    "Study 6",
  ];

  const retrieveAvailableStudies = () => {
    setAvailableStudies(DUMMY_AVAILABLE_STUDIES);
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("retrive studies (timeout)");
      retrieveAvailableStudies();
    }, 500);
  }, []);

  if (isAtStart && !availableStudies) {
    return <LoadScreen message={"Retrieving Available Studies..."} />;
  }

  if (isAtStart && availableStudies) {
    return (
      <div>
        <IngestionStart
          setIsAtStart={setIsAtStart}
          availableStudies={availableStudies}
          setMetadata={setMetadata}
          selectedStudy={selectedStudy}
          setSelectedStudy={setSelectedStudy}
          filePaths={filePaths}
          setFilePaths={setFilePaths}
        />
      </div>
    );
  }

  if (!isAtStart && !metadata) {
    return <LoadScreen message={"Retrieving Metadata..."} />;
  }

  if (!isAtStart && metadata) {
    return (
      <IngestionMetadata
        metadata={metadata}
        setIsAtStart={setIsAtStart}
        setMetadata={setMetadata}
      />
    );
  }

  // return (
  //   <div>
  //     {/* {metadata ? (
  //       <IngestionStart setIsAtStart={setIsAtStart} setMetadata={setMetadata} />
  //     ) : (
  //       <IngestionMetadata metadata={metadata} />
  //     )} */}
  //   </div>
  // );
};

export default Ingestion;
