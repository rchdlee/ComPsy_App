import IngestionStart from "./IngestionStart";
import IngestionSelect from "./IngestionSelect";
import IngestionMetadata from "./IngestionMetadata";
import LoadScreen from "./LoadScreen";
import { useState } from "react";
import { useEffect } from "react";

const Ingestion = (props) => {
  // State for STEP 1 - IngestionStart
  const [isAtStart, setIsAtStart] = useState(true);
  const [availableStudies, setAvailableStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [filePath, setFilePath] = useState([]);
  const [selectedDirectories, setSelectedDirectories] = useState([]);
  //

  // State for STEP 2 - IngestionSelect
  const [videoListFull, setVideoListFull] = useState(null);
  const [videoListSelected, setVideoListSelected] = useState([]);
  const [hasSelectedVideos, setHasSelectedVideos] = useState(false);
  //

  // State for STEP 3 - IngestionMetadata
  const [metadata, setMetadata] = useState(null);
  //

  // // STEP 1 - IngestionStart //

  // DUMMY available files based on selected study
  const DUMMY_FILE_EXPLORER_firststudy = [
    {
      name: "participant_data_firststudy",

      subFolders: [
        {
          name: "SC001",

          subFolders: [
            {
              name: "new_data",

              subFolders: [
                {
                  name: "1.1",
                },
                {
                  name: "2.1",
                },
                {
                  name: "3.1",
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

              subFolders: [
                {
                  name: "1.2",
                },
                {
                  name: "2.2",
                },
                {
                  name: "3.2",
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
  const DUMMY_FILE_EXPLORER_secondstudy = [
    {
      name: "participant_data_secondstudy",

      subFolders: [
        {
          name: "SC001",

          subFolders: [
            {
              name: "new_datatrsa",

              subFolders: [
                {
                  name: "1.1tsra",
                },
                {
                  name: "2.1",
                },
                {
                  name: "3.1",
                },
              ],
            },
            {
              name: "CASStrsa",
            },
            {
              name: "R2R",
            },
          ],
        },
        {
          name: "SC002trsa",

          subFolders: [
            {
              name: "new_data",

              subFolders: [
                {
                  name: "1.2",
                },
                {
                  name: "2.2",
                },
                {
                  name: "3.2",
                },
              ],
            },
            {
              name: "CASStsra",
            },
            {
              name: "R2R",
            },
          ],
        },
      ],
    },
    {
      name: "phenotypic_datatsra",

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
          name: "category2phentrsa",

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

  // FIX FOR API
  const DUMMY_FILE_EXPLORER_DISPLAY =
    selectedStudy?.name === "first study lalala"
      ? DUMMY_FILE_EXPLORER_firststudy
      : DUMMY_FILE_EXPLORER_secondstudy;

  // Retrieve all studies that user has access to // -- maybe backend could do this separately without having to retrieve all studies?
  useEffect(() => {
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
  //
  
  // // STEP 2 // //
  
  const DUMMY_VIDEO_LIST_FROM_API = [
    "video1",
    "video2",
    "video3",
    "video4",
    "video5",
    "video6",
    "video7",
    "video8",
    "video9",
    "video10",
    "video11",
  ];
  
  // Retrieve videos from selected directories -- DUMMY
  const fetchVideosFromDirectories = () => {
    console.log("fetching videos");
    setTimeout(() => {
      setVideoListFull(DUMMY_VIDEO_LIST_FROM_API);
    }, 1000);
  };

  // // STEP 3 // //

  const DUMMY_MISSING_METADATA = [
    {
      fileName: "file1.ext",
      study: "Study A",
      fields: [
        {
          name: "Subject",
          type: "select",
          options: ["1", "3", "5", "7"],
          value: "3",
        },
        {
          name: "TaskID",
          type: "select",
          options: ["1", "2", "3"],
          value: "",
        },
        {
          name: "Session",
          type: "input",
          options: null,
          value: "test 1 session",
        },
        {
          name: "Acquisition",
          type: "select",
          options: ["Interested", "Not Interested"],
          value: "",
        },
        { name: "Administration", type: "input", options: null, value: "" },
        { name: "Device", type: "input", options: null, value: "" },
      ],
    },
    {
      fileName: "file2.extt",
      study: "Study A",
      fields: [
        {
          name: "Subject",
          type: "select",
          options: ["2", "4", "6", "8"],
          value: "4",
        },
        {
          name: "TaskID",
          type: "select",
          options: ["4", "5", "6"],
          value: "5",
        },
        { name: "Session", type: "input", options: null, value: "qqq" },
        {
          name: "Acquisition",
          type: "select",
          options: ["Interested!", "Not Interested!"],
          value: "Not Interested!",
        },
        {
          name: "Administration",
          type: "input",
          options: null,
          value: "test 2",
        },
        { name: "Device", type: "input", options: null, value: "qqq" },
      ],
    },
    {
      fileName: "file3.exttt",
      study: "Study A",
      fields: [
        {
          name: "Subject",
          type: "select",
          options: ["2.5", "4.5", "6.5", "8.5"],
          value: "",
        },
        {
          name: "TaskID",
          type: "select",
          options: ["7", "8", "9"],
          value: "",
        },
        { name: "Session", type: "input", options: null, value: "" },
        // {
        //   name: "Acquisition",
        //   type: "select",
        //   options: ["Interested!!", "Not Interested!!"],
        //   value: "",
        // },
        {
          name: "Administration",
          type: "input",
          options: null,
          value: "test default value!",
        },
        { name: "Device", type: "input", options: null, value: "" },
      ],
    },
  ];

  // // RENDERS // //

  // initial load
  if (isAtStart && !availableStudies) {
    return (
      <div>
        <div className="mt-24"></div>
        <LoadScreen message={"Retrieving Available Studies..."} marginTop="0" />
      </div>
    );
  }

  // STEP 1 - IngestionStart
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
          fetchVideos={fetchVideosFromDirectories}
          selectedDirectories={selectedDirectories}
          setSelectedDirectories={setSelectedDirectories}
          throwNewErrorModal={props.throwNewErrorModal}
          setHasError={props.setHasError}
        />
      </div>
    );
  }

  // load for step 2
  if (!isAtStart && !videoListFull) {
    return (
      <div>
        <div className="mt-24"></div>
        <LoadScreen
          message={"Retrieving Videos from Selected Directories..."}
          marginTop="0"
        />
      </div>
    );
  }

  // STEP 2 - IngestionSelect
  if (!isAtStart && videoListFull && !hasSelectedVideos) {
    return (
      <div>
        <IngestionSelect
          videoListFull={videoListFull}
          setVideoListFull={setVideoListFull}
          videoListSelected={videoListSelected}
          setVideoListSelected={setVideoListSelected}
          DUMMY_VIDEO_LIST_FROM_API={DUMMY_VIDEO_LIST_FROM_API}
          setHasSelectedVideos={setHasSelectedVideos}
          setMetadata={setMetadata}
          DUMMY_MISSING_METADATA={DUMMY_MISSING_METADATA}
          setIsAtStart={setIsAtStart}
          setHasError={props.setHasError}
          throwNewErrorModal={props.throwNewErrorModal}
        />
      </div>
    );
  }

  // load for step 3
  if (!isAtStart && hasSelectedVideos && !metadata) {
    return (
      <div>
        <div className="mt-24"></div>
        <LoadScreen message={"Retrieving Metadata..."} marginTop="0" />;
      </div>
    );
  }

  // STEP 3 - IngestionMetadata
  if (!isAtStart && metadata) {
    return (
      <IngestionMetadata
        metadata={metadata}
        setIsAtStart={setIsAtStart}
        setMetadata={setMetadata}
        setHasSelectedVideos={setHasSelectedVideos}
      />
    );
  }
};

export default Ingestion;
