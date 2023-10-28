import IngestionStart from "./IngestionStart";
import IngestionSelect from "./IngestionSelect";
import IngestionMetadata from "./IngestionMetadata";
import LoadScreen from "./LoadScreen";
import { useState } from "react";
import { useEffect } from "react";
import IngestionMetadata2 from "./IngestionMetadata2";

const Ingestion = (props) => {
  // State for STEP 1 - IngestionStart
  const [isAtStart, setIsAtStart] = useState(true);
  // const [isAtStart, setIsAtStart] = useState(false);
  const [availableStudies, setAvailableStudies] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [filePath, setFilePath] = useState([]);
  const [selectedDirectories, setSelectedDirectories] = useState([]);
  const [root, setRoot] = useState();
  //

  // State for STEP 2 - IngestionSelect
  const [videoListFull, setVideoListFull] = useState(null);
  // const [videoListFull, setVideoListFull] = useState([]);
  const [videoListSelected, setVideoListSelected] = useState([]);
  const [hasSelectedVideos, setHasSelectedVideos] = useState(false);
  // const [hasSelectedVideos, setHasSelectedVideos] = useState(true);
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
      const availableStudies = allStudies?.filter((study) =>
        study.users.includes(selfID)
      );

      // console.log(availableStudies, "🥶");
      setAvailableStudies(availableStudies);
    };
    filterStudies();
  }, []);
  //

  // // STEP 2 // //

  // const DUMMY_VIDEO_LIST_FROM_API = [
  //   "video1",
  //   "video2",
  //   "video3",
  //   "video4",
  //   "video5",
  //   "video6",
  //   "video7",
  //   "video8",
  //   "video9",
  //   "video10",
  //   "video11",
  // ];

  const DUMMY_VIDEO_LIST_FROM_API = [
    {
      fullPath: "path/1/2/video1.mp4",
    },
    {
      fullPath: "path/1/2/video2.mp4",
    },
    {
      fullPath: "path/1/2/video3.mov",
    },
    {
      fullPath: "path/1/2/audio2point5.aac",
    },
    {
      fullPath: "path/a/b/video4.mov",
    },
    {
      fullPath: "path/a/b/audio5.mp3",
    },
    {
      fullPath: "path/a/b/video6.mp4",
    },
    { fullPath: "path/c/d/e/video7.avi" },
    { fullPath: "path/c/d/e/audio8.flac" },
  ];

  // move to separate json  -- work with backend
  const videoTypes = ["mp4", "mpeg", "avi", "mkv", "mov"];
  const audioTypes = ["mp3", "wav", "aac", "ogg", "flac", "m4a", "aiff"];

  // helper function
  function groupBy(arr, property) {
    return arr.reduce(function (memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  //

  // Retrieve videos from selected directories -- DUMMY
  const fetchVideosFromDirectories = () => {
    console.log("fetching videos");

    const selectedDirectoriesNoServerPathArray = selectedDirectories.map(
      (name) => {
        return name.fullPath
          .slice(selectedStudy.server_path.length + 1)
          .split("\\");
      }
    );

    const directories = selectedDirectoriesNoServerPathArray.map((array) => {
      const pathDepth = array.length;
      let directory = root;
      for (let i = 0; i < pathDepth; i++) {
        directory = directory[array[i]];
      }
      return directory;
    });

    console.log(directories, "🎎");

    const files = directories.map((directory) => {
      return directory.files;
    });

    const fileArray = [];

    const files2 = directories.map((directory) => {
      // if (directory.length === 1) {
      //   console.log("directory one file", directory.files);
      //   directory.files.forEach((file) => {
      //     fileArray.push(file);
      //   });
      // }

      directory.files.forEach((file) => {
        fileArray.push(file);
      });

      const directoriesWithNoFiles = Object.entries(directory).filter(
        (folder) => !folder.includes("files")
      );

      directoriesWithNoFiles.forEach((file) => {
        
      })

      return directoriesWithNoFiles;
    });

    console.log(files2, "🧨", fileArray);

    // const files = directories.map((directory) => {
    //   const allFilesTest = [];

    //   if (directory.files.length > 0) {
    //     console.log("main directory has files");
    //     allFilesTest.push(directory.files);
    //   }

    //   if (directory.files.length === 0) {
    //     console.log("main directory does not have files");
    //   }

    //   if (directory.length > 1) {
    //     const { files, ...rest } = Object.assign({}, directory);

    //     rest.map((child) => {
    //       allFilesTest.push(child.files);
    //     });
    //   }
    //   // return directory.files;
    // });

    console.log(files, "🎃");

    const DUMMY_CLEANUP = DUMMY_VIDEO_LIST_FROM_API.map((file) => {
      const pathArray = file.fullPath.split("/");
      const pathLength = pathArray.length;
      const name = pathArray[pathLength - 1];

      const extension = name.split(".")[1];

      const directory = pathArray.slice(0, -1).join("/");

      let fileType;
      if (videoTypes.includes(extension)) {
        fileType = "video";
      }
      if (audioTypes.includes(extension)) {
        fileType = "audio";
      }

      return {
        ...file,
        name: name,
        directory: directory,
        extension: extension,
        fileType: fileType,
      };
      // file.name = name;
      // file.extension = extension;
    });

    const DUMMY_CLEANUP2 = groupBy(DUMMY_CLEANUP, "directory");

    const DUMMY_CLEANUP3 = Object.entries(DUMMY_CLEANUP2).map(
      ([key, value]) => {
        return {
          directory: key,
          files: value,
        };
      }
    );

    console.log(DUMMY_CLEANUP, DUMMY_CLEANUP2, DUMMY_CLEANUP3, "🤖");

    setTimeout(() => {
      // setVideoListFull(DUMMY_VIDEO_LIST_FROM_API);
      setVideoListFull(DUMMY_CLEANUP3);
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
          type: "text",
          options: null,
          value: "test 1 session",
        },
        {
          name: "Acquisition",
          type: "select",
          options: ["Interested", "Not Interested"],
          value: "",
        },
        { name: "Administration", type: "text", options: null, value: "" },
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

  const DUMMY_MISSING_METADATA_NEW = {
    fields: [
      { name: "Subject", required: true },
      { name: "Session", required: false },
      { name: "Task", required: true },
      { name: "Condition", required: false },
      { name: "Target", required: false },
      { name: "Run", required: false },
      { name: "Device", required: false },
      { name: "Channel", required: false },
      { name: "Modality", required: true },
      { name: "Notes", required: false },
    ],
    metadata: [
      {
        fileName: "file1.ext",
        fileID: "123A",
        study: "Study A",
        fields: [
          {
            name: "Subject",
            type: "text",
            options: null,
            value: "",
            required: true,
          },
          {
            name: "Session",
            type: "number",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Task",
            type: "select",
            options: ["1", "2", "3"],
            value: "",
            required: true,
          },
          {
            name: "Condition",
            type: "select",
            options: [
              "condition 1",
              "condition 2",
              "condition 3",
              "condition 4",
            ],
            value: "condition 2",
            required: false,
          },
          {
            name: "Target",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Run",
            type: "number",
            options: null,
            value: 3,
            required: false,
          },
          {
            name: "Device",
            type: "select",
            options: ["device 1", "device 2", "device 3", "device 4"],
            value: "",
            required: false,
          },
          {
            name: "Channel",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Modality",
            type: "select",
            options: [
              "RGB",
              "RGBA",
              "RGBD",
              "RGBAD",
              "depth",
              "audio",
              "other",
            ],
            value: "",
            required: true,
          },
          {
            name: "Notes",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
        ],
      },
      {
        fileName: "file2.ext",
        fileID: "12345A",
        study: "Study A",
        fields: [
          {
            name: "Subject",
            type: "text",
            options: null,
            value: "",
            required: true,
          },
          {
            name: "Session",
            type: "number",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Task",
            type: "select",
            options: ["1", "2", "3", "4"],
            value: "",
            required: true,
          },
          {
            name: "Condition",
            type: "select",
            options: [
              "condition 1",
              "condition 2",
              "condition 3",
              "condition 4",
            ],
            value: "condition 2",
            required: false,
          },
          {
            name: "Target",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Run",
            type: "number",
            options: null,
            value: 3,
            required: false,
          },
          {
            name: "Device",
            type: "select",
            options: ["device 1", "device 2", "device 3", "device 4"],
            value: "",
            required: false,
          },
          {
            name: "Channel",
            type: "text",
            options: null,
            value: "channel A",
            required: false,
          },
          {
            name: "Modality",
            type: "select",
            options: [
              "RGB",
              "RGBA",
              "RGBD",
              "RGBAD",
              "depth",
              "audio",
              "other",
            ],
            value: "",
            required: true,
          },
          {
            name: "Notes",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
        ],
      },
      {
        fileName: "file3.ext",
        fileID: "123B",
        study: "Study B",
        fields: [
          {
            name: "Subject",
            type: "text",
            options: null,
            value: "",
            required: true,
          },
          {
            name: "Session",
            type: "number",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Task",
            type: "select",
            options: ["1", "2", "3"],
            value: "",
            required: true,
          },
          {
            name: "Condition",
            type: "select",
            options: [
              "condition 1",
              "condition 2",
              "condition 3",
              "condition 4",
            ],
            value: "",
            required: false,
          },
          {
            name: "Target",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Run",
            type: "number",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Device",
            type: "select",
            options: ["device 1", "device 2", "device 3", "device 4"],
            value: "",
            required: false,
          },
          {
            name: "Channel",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
          {
            name: "Modality",
            type: "select",
            options: [
              "RGB",
              "RGBA",
              "RGBD",
              "RGBAD",
              "depth",
              "audio",
              "other",
            ],
            value: "RGBD",
            required: true,
          },
          {
            name: "Notes",
            type: "text",
            options: null,
            value: "",
            required: false,
          },
        ],
      },
    ],
  };

  // const [metadata, setMetadata] = useState(DUMMY_MISSING_METADATA_NEW);

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
          root={root}
          setRoot={setRoot}
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
          DUMMY_MISSING_METADATA_NEW={DUMMY_MISSING_METADATA_NEW}
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
      // <IngestionMetadata
      //   metadata={metadata}
      //   setIsAtStart={setIsAtStart}
      //   setMetadata={setMetadata}
      //   setHasSelectedVideos={setHasSelectedVideos}
      // />
      <IngestionMetadata2
        metadata={metadata}
        throwNewErrorModal={props.throwNewErrorModal}
      />
    );
  }
};

export default Ingestion;
