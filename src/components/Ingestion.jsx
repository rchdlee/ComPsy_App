import IngestionStart from "./IngestionStart";
import IngestionMetadata from "./IngestionMetadata";
import LoadScreen from "./LoadScreen";
import { useState } from "react";
import { useEffect } from "react";

const Ingestion = () => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [availableStudies, setAvailableStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  // const [filePaths, setFilePaths] = useState(null);

  const [filePath, setFilePath] = useState([]);
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

  const DUMMY_FILE_EXPLORER = [
    {
      name: "participant_data",
      subFolders: [
        {
          name: "SC001",
          subFolders: [
            {
              name: "new_data",
              subFolders: [
                {
                  name: "1",
                },
                {
                  name: "2",
                },
                {
                  name: "3",
                },
              ],
            },
            {
              name: "CASS",
            },
            {
              name: "R2R",
            },
          ],
        },
        {
          name: "SC002",
          subFolders: [
            {
              name: "new_data",
            },
            {
              name: "CASS",
            },
            {
              name: "R2R",
            },
          ],
        },
      ],
    },
    {
      name: "phenotypic_data",
      subFolders: [
        {
          name: "category1phen",
          subFolders: [
            {
              name: "phen1_1",
            },
            {
              name: "phen1_2",
            },
          ],
        },
        {
          name: "category2phen",
          subFolders: [
            {
              name: "phen2_1",
            },
            {
              name: "phen2_2",
            },
          ],
        },
      ],
    },
    {
      name: "temp",
      subFolders: [
        {
          name: "category1temp",
          subFolders: [
            {
              name: "temp1_1",
            },
            {
              name: "temp1_2",
            },
          ],
        },
        {
          name: "category2temp",
          subFolders: [
            {
              name: "temp2_1",
            },
            {
              name: "temp2_2",
            },
          ],
        },
      ],
    },
    {
      name: "misc",
      subFolders: [
        {
          name: "category1",
          subFolders: [
            {
              name: "misc1_1",
            },
            {
              name: "misc1_2",
            },
          ],
        },
        {
          name: "category2",
          subFolders: [
            {
              name: "misc2_1",
            },
            {
              name: "misc2_2",
            },
          ],
        },
      ],
    },
  ];

  const retrieveAvailableStudies = () => {
    setAvailableStudies(DUMMY_AVAILABLE_STUDIES);
  };

  useEffect(() => {
    // setTimeout(() => {
    //   console.log("retrive studies (timeout)");
    //   retrieveAvailableStudies();
    // }, 500);

    // should I store ID somewhere earlier from app.jsx component? is fetching here too much?
    const getSelf = async () => {
      const response = await fetch("http://localhost:8000/user/get_self", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!response.ok) {
        return;
      }
      const data = await response.json();
      return data.id;
    };

    const fetchStudies = async () => {
      const response = await fetch("http://localhost:8000/study/all_studies", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!response.ok) {
        console.error("problem with fetching studies! ❌");
      }
      const data = await response.json();
      // console.log(data, "👺");
      return data;
    };

    const filterStudies = async () => {
      const selfID = await getSelf();
      const allStudies = await fetchStudies();

      // console.log(selfID, allStudies, "😶");
      const availableStudies = allStudies.filter((study) =>
        study.users.includes(selfID)
      );

      // console.log(availableStudies, "🥶");
      setAvailableStudies(availableStudies);
    };
    filterStudies();
  }, []);

  if (isAtStart && !availableStudies) {
    return (
      <div>
        <div className="mt-24"></div>
        <LoadScreen message={"Retrieving Available Studies..."} marginTop="0" />
      </div>
    );
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
          // filePaths={filePaths}
          // setFilePaths={setFilePaths}
          fileExplorer={DUMMY_FILE_EXPLORER}
          filePath={filePath}
          setFilePath={setFilePath}
        />
      </div>
    );
  }

  if (!isAtStart && !metadata) {
    return (
      <div>
        <div className="mt-24"></div>
        <LoadScreen message={"Retrieving Metadata..."} marginTop="0" />;
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
