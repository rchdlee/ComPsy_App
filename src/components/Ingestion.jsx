import IngestionStart from "./IngestionStart";
import IngestionMetadata from "./IngestionMetadata";
import { useState } from "react";

const Ingestion = () => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [metadata, setMetadata] = useState(null);

  console.log(metadata, "😋");

  if (isAtStart) {
    return (
      <IngestionStart setIsAtStart={setIsAtStart} setMetadata={setMetadata} />
    );
  }

  if (!isAtStart && !metadata) {
    return <div className="lds-dual-ring"></div>;
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
