import IngestionStart from "./IngestionStart";
import IngestionMetadata from "./IngestionMetadata";
import { useState } from "react";

const Ingestion = () => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [metadata, setMetadata] = useState(null);

  console.log(metadata, "😋");

  if (isAtStart) {
    return (
      <div>
        <IngestionStart setIsAtStart={setIsAtStart} setMetadata={setMetadata} />
      </div>
    );
  }

  if (!isAtStart && !metadata) {
    return (
      <div className="flex items-center mt-24 flex-col gap-8">
        <div
          className="inline-block w-20 h-20 after:content-[' '] after:block after:w-16 after:h-16 after:m-2 after:border-[6px] 
          after:border-t-blackTextLight after:border-l-white after:border-b-blackTextLight after:border-r-white
          dark:after:border-t-white dark:after:border-l-backgroundDark dark:after:border-b-white dark:after:border-r-backgroundDark
          after:animate-spin
          after:rounded-full"
        ></div>
        <p className="text-blackTextLight dark:text-white">
          Retrieving Metadata...
        </p>
      </div>
    );
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
