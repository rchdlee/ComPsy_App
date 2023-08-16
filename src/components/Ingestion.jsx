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

  const DUMMY_FILE_EXPLORER_firststudy = [
    {
      name: "participant_data_firststudy",
      type: "folder",
      subFolders: [
        {
          name: "SC001",
          type: "folder",
          subFolders: [
            {
              name: "new_data",
              type: "folder",
              subFolders: [
                {
                  name: "1.1",
                  type: "video",
                },
                {
                  name: "2.1",
                  type: "video",
                },
                {
                  name: "3.1",
                  type: "video",
                },
              ],
            },
            {
              name: "CASS",
              type: "folder",
            },
            {
              name: "R2R",
              type: "folder",
            },
          ],
        },
        {
          name: "SC002",
          type: "folder",
          subFolders: [
            {
              name: "new_data",
              type: "folder",
              subFolders: [
                {
                  name: "1.2",
                  type: "video",
                },
                {
                  name: "2.2",
                  type: "video",
                },
                {
                  name: "3.2",
                  type: "video",
                },
              ],
            },
            {
              name: "CASS",
              type: "folder",
            },
            {
              name: "R2R",
              type: "folder",
            },
          ],
        },
      ],
    },
    {
      name: "phenotypic_data",
      type: "folder",
      subFolders: [
        {
          name: "category1phen",
          type: "folder",
          subFolders: [
            {
              name: "phen1_1",
              type: "folder",
            },
            {
              name: "phen1_2",
              type: "folder",
            },
          ],
        },
        {
          name: "category2phen",
          type: "folder",
          subFolders: [
            {
              name: "phen2_1",
              type: "folder",
            },
            {
              name: "phen2_2",
              type: "folder",
            },
          ],
        },
      ],
    },
    {
      name: "temp",
      type: "folder",
      subFolders: [
        {
          name: "category1temp",
          type: "folder",
          subFolders: [
            {
              name: "temp1_1",
              type: "folder",
            },
            {
              name: "temp1_2",
              type: "folder",
            },
          ],
        },
        {
          name: "category2temp",
          type: "folder",
          subFolders: [
            {
              name: "temp2_1",
              type: "folder",
            },
            {
              name: "temp2_2",
              type: "folder",
            },
          ],
        },
      ],
    },
    {
      name: "misc",
      type: "folder",
      subFolders: [
        {
          name: "category1",
          type: "folder",
          subFolders: [
            {
              name: "misc1_1",
              type: "folder",
            },
            {
              name: "misc1_2",
              type: "folder",
            },
          ],
        },
        {
          name: "category2",
          type: "folder",
          subFolders: [
            {
              name: "misc2_1",
              type: "folder",
            },
            {
              name: "misc2_2",
              type: "folder",
            },
          ],
        },
      ],
    },
  ];
  const DUMMY_FILE_EXPLORER_secondstudy = [
    {
      name: "participant_data_secondstudy",
      type: "folder",
      subFolders: [
        {
          name: "SC001",
          type: "folder",
          subFolders: [
            {
              name: "new_datatrsa",
              type: "folder",
              subFolders: [
                {
                  name: "1.1tsra",
                  type: "video",
                },
                {
                  name: "2.1",
                  type: "video",
                },
                {
                  name: "3.1",
                  type: "video",
                },
              ],
            },
            {
              name: "CASStrsa",
              type: "folder",
            },
            {
              name: "R2R",
              type: "folder",
            },
          ],
        },
        {
          name: "SC002trsa",
          type: "folder",
          subFolders: [
            {
              name: "new_data",
              type: "folder",
              subFolders: [
                {
                  name: "1.2",
                  type: "video",
                },
                {
                  name: "2.2",
                  type: "video",
                },
                {
                  name: "3.2",
                  type: "video",
                },
              ],
            },
            {
              name: "CASStsra",
              type: "folder",
            },
            {
              name: "R2R",
              type: "folder",
            },
          ],
        },
      ],
    },
    {
      name: "phenotypic_datatsra",
      type: "folder",
      subFolders: [
        {
          name: "category1phen",
          type: "folder",
          subFolders: [
            {
              name: "phen1_1",
              type: "folder",
            },
            {
              name: "phen1_2",
              type: "folder",
            },
          ],
        },
        {
          name: "category2phentrsa",
          type: "folder",
          subFolders: [
            {
              name: "phen2_1",
              type: "folder",
            },
            {
              name: "phen2_2",
              type: "folder",
            },
          ],
        },
      ],
    },
    {
      name: "temp",
      type: "folder",
      subFolders: [
        {
          name: "category1temp",
          type: "folder",
          subFolders: [
            {
              name: "temp1_1",
              type: "folder",
            },
            {
              name: "temp1_2",
              type: "folder",
            },
          ],
        },
        {
          name: "category2temp",
          type: "folder",
          subFolders: [
            {
              name: "temp2_1",
              type: "folder",
            },
            {
              name: "temp2_2",
              type: "folder",
            },
          ],
        },
      ],
    },
    {
      name: "misc",
      type: "folder",
      subFolders: [
        {
          name: "category1",
          type: "folder",
          subFolders: [
            {
              name: "misc1_1",
              type: "folder",
            },
            {
              name: "misc1_2",
              type: "folder",
            },
          ],
        },
        {
          name: "category2",
          type: "folder",
          subFolders: [
            {
              name: "misc2_1",
              type: "folder",
            },
            {
              name: "misc2_2",
              type: "folder",
            },
          ],
        },
      ],
    },
  ];

  // FIX FOR API
  const DUMMY_FILE_EXPLORER_DISPLAY =
    selectedStudy?.name === "first study lalala"
      ? DUMMY_FILE_EXPLORER_firststudy
      : DUMMY_FILE_EXPLORER_secondstudy;

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
          fileExplorer={DUMMY_FILE_EXPLORER_firststudy}
          // fileExplorer={DUMMY_FILE_EXPLORER_DISPLAY}
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
