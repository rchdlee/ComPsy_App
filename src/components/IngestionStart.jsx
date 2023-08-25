import { useState, useCallback, useRef } from "react";

import IngestionStartError from "./IngestionStartError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IngestionStart = (props) => {
  // const [hasError, setHasError] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);

  const DUMMY_AVAILABLE_STUDIES = props.availableStudies;
  const DUMMY_DIRECTORY_FILES = props.fileExplorer;

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

  const continueHandler = () => {
    // props.setIsAtStart(false);
    console.log("clicked continue!", props.selectedDirectories);

    if (!props.selectedStudy) {
      console.log("error-qntsireantrseionateio");
      props.throwNewErrorModal(
        "Please select a study and a directory for ingestion",
        "app"
      );
      return;
    }

    if (props.selectedDirectories.length === 0) {
      props.throwNewErrorModal(
        "Please select at least one directory for ingestion",
        "app"
      );
      return;
    }

    props.setFilePath([]);
    props.setHasError(false);
    props.setIsAtStart(false);
    props.fetchVideos();
    // setTimeout(() => {
    //   props.setMetadata(DUMMY_MISSING_METADATA);
    // }, 500);
    // handleSubmit(onSubmit);
  };

  const studyClickHandler = (e) => {
    // console.log(e.target.innerHTML);
    const studyName = e.target.innerHTML;
    const selectedStudyData = props.availableStudies.filter(
      (study) => study.name === studyName
    )[0];

    console.log(selectedStudyData, "😎");

    props.setSelectedStudy(selectedStudyData);
    setFurthestDirectoryItem(DUMMY_DIRECTORY_FILES);
    props.setFilePath([]);
    props.setSelectedDirectories([]);
  };

  // const createContinueError = (message) => {
  //   setHasError(true);
  //   setErrorMessage(message);
  // };

  const DUMMY_AVAILABLE_STUDIES_JSX = DUMMY_AVAILABLE_STUDIES.map((study) => {
    const selected =
      props.selectedStudy?.name === study.name
        ? "bg-lilacBlue"
        : "text-blackTextLight dark:text-white hover:bg-cardLight dark:hover:bg-cardDark";

    return (
      <div
        key={study.name}
        onClick={studyClickHandler}
        className={`border-2 border-blackTextLight dark:border-white rounded h-14 flex items-center mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
      >
        {study.name}
      </div>
    );
  });

  const [furthestDirectoryItem, setFurthestDirectoryItem] = useState(
    // need to change when making API request per study
    DUMMY_DIRECTORY_FILES
  );

  // console.log(DUMMY_DIRECTORY_FILES, furthestDirectoryItem, "😎😋");

  const fileClickHandler = (e) => {
    const index = e.target.closest("div").id;
    const subFolders = furthestDirectoryItem[index].subFolders;
    const pathDepth = props.filePath.length;

    console.log("furthestdirectoryitem", furthestDirectoryItem);
    const selectedItem = furthestDirectoryItem[index];

    // console.log(
    //   "file clicked",
    //   "depth",
    //   pathDepth,
    //   "index",
    //   index,
    //   selectedItem,
    //   selectedItem.name,
    //   subFolders
    // );

    if (!subFolders) {
      console.log("end of path");
      props.throwNewErrorModal("No more directories inside this folder", "app");
      return;
    }

    props.setFilePath((prevState) => [...prevState, selectedItem.name]);
    setFurthestDirectoryItem(subFolders);
  };

  const filePathClickHandler = (e) => {
    if (+e.target.id + 1 === pathDepth) {
      console.log("already on this folder");
      return;
    }
    console.log(pathDepth, e.target.id, e.target.innerHTML, props.filePath);
    // const newFoldersToDisplay = DUMMY_AVAILABLE_STUDIES
    let itemsToShow = DUMMY_DIRECTORY_FILES;
    for (let i = 0; i < +e.target.id + 1; i++) {
      console.log(`i = ${i}`);
      itemsToShow = itemsToShow.filter(
        (item) => item.name === props.filePath[i]
      )[0].subFolders;
      console.log(itemsToShow);
    }
    console.log(itemsToShow, "🤖");
    props.setFilePath((prevState) => prevState.slice(0, +e.target.id + 1));
    setFurthestDirectoryItem(itemsToShow);
  };

  const rootPathClickHandler = () => {
    setFurthestDirectoryItem(DUMMY_DIRECTORY_FILES);
    props.setFilePath([]);
  };

  // const DUMMY_FILE_PATH_JSX = filePath;
  const initial_DUMMY_FILE_PATH_JSX = props.selectedStudy ? (
    <p
      className="hover:underline hover:cursor-pointer"
      onClick={rootPathClickHandler}
      key={"initial_path"}
    >
      {props.selectedStudy.server_path}
    </p>
  ) : (
    <p>Please select a study to view its child directories</p>
  );

  const DUMMY_FILE_PATH = props.filePath.map((pathName, index) => {
    return (
      <div className="flex items-center gap-3" key={index}>
        <p
          id={index}
          className="hover:underline hover:cursor-pointer"
          onClick={filePathClickHandler}
        >
          {pathName}
        </p>
        <FontAwesomeIcon icon="chevron-right" />
      </div>
    );
  });

  const pathDepth = props.filePath.length;
  // console.log(pathDepth, props.filePath, "💩");

  const inputClickHandler = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.closest("input").id;
    const filePathFull = `${props.selectedStudy.server_path}${
      pathDepth === 0 ? "" : "/"
    }${props.filePath.join("/")}/${inputName}`;

    console.log(e, pathDepth, isChecked, inputName, filePathFull);
    const filePathInfo = {
      fullPath: filePathFull,
      // fileName: inputName,
    };

    if (isChecked) {
      console.log("just checked the box!");
      props.setSelectedDirectories((prevState) => [...prevState, filePathInfo]);
    }
    if (!isChecked) {
      console.log("just UNCHEKED the box!");
      props.setSelectedDirectories((prevState) =>
        // prevState.filter((info) => info.fileName !== inputName)
        prevState.filter((info) => info.fullPath !== filePathFull)
      );
    }
  };

  const DUMMY_FILE_EXPLORER_JSX = props.selectedStudy
    ? furthestDirectoryItem.map((item, index) => {
        const filePathFull = `${props.selectedStudy.server_path}${
          pathDepth === 0 ? "" : "/"
        }${props.filePath.join("/")}/${item.name}`;

        // if (item.type === "folder") {
        return (
          <div
            className="flex justify-between items-center flex-wrap"
            key={index}
          >
            <div
              className="group flex gap-3 items-center"
              id={index}
              onClick={fileClickHandler}
            >
              <FontAwesomeIcon icon="fa-folder" />
              <p className="group-hover:underline group-hover:cursor-pointer">
                {item.name}
              </p>
            </div>
            <input
              className="mt-0.5"
              type="checkbox"
              id={item.name}
              // onClick={testInputClickHandler}
              onChange={inputClickHandler}
              checked={
                !(
                  props.selectedDirectories.filter(
                    // (path) => path.fileName === item.name
                    (path) => path.fullPath === filePathFull
                  ).length === 0
                )
              }
            />
          </div>
        );
      })
    : "";

  const selectedDirectoryClickHandler = (e) => {
    const filePath = e.target.closest("p").id;
    const serverPathLength = props.selectedStudy.server_path.length;
    const filePathWithoutServerPath = filePath.slice(serverPathLength + 1);
    const filePathWithoutServerPathArray = filePathWithoutServerPath.split("/");

    const pathLength = filePathWithoutServerPathArray.length;
    // console.log(props.fileExplorer);

    let parentFolder = props.fileExplorer;
    for (let i = 0; i < pathLength - 1; i++) {
      // parentFolder = props.fileExplorer.filter(
      //   (item) => item.name === filePathWithoutServerPathArray[i]
      // )[0].subFolders;

      if (i === 0) {
        parentFolder = parentFolder.filter(
          (item) => item.name === filePathWithoutServerPathArray[i]
        )[0];
        // console.log(parentFolder, "🐨");
      }
      if (i > 0) {
        parentFolder = parentFolder.subFolders.filter(
          (item) => item.name === filePathWithoutServerPathArray[i]
        )[0];
        // console.log(parentFolder, "🐕‍🦺");
      }
    }

    // console.log("FINAL", parentFolder);
    filePathWithoutServerPathArray.pop();
    const subFolders = parentFolder.subFolders;

    if (!subFolders) {
      console.log("no subfolders");
      setFurthestDirectoryItem(parentFolder);
      props.setFilePath(filePathWithoutServerPathArray);
      return;
    }

    console.log(
      parentFolder,
      "subfolders:",
      subFolders,
      "filepatharray:",
      filePathWithoutServerPathArray
    );

    setFurthestDirectoryItem(subFolders);
    props.setFilePath(filePathWithoutServerPathArray);

    // console.log(
    //   filePath,
    //   props.selectedStudy,
    //   props.filePath,
    //   serverPathLength,
    //   filePathWithoutServerPathArray
    // );
  };

  const DUMMY_SELECTED_DIRECTORIES_JSX = props.selectedDirectories.map(
    (item) => {
      return (
        <p
          className="text-xs hover:underline hover:cursor-pointer"
          key={item.fullPath}
          id={item.fullPath}
          onClick={selectedDirectoryClickHandler}
        >
          {item.fullPath}
        </p>
      );
    }
  );

  // const selectAllFilesHandler = () => {
  //   const allFilePathInfoFromFolder = furthestDirectoryItem.map((item) => {
  //     return {
  //       fullPath: `${props.selectedStudy.server_path}/${props.filePath.join(
  //         "/"
  //       )}/${item.name}`,
  //       // fileName: item.name,
  //     };
  //   });
  //   const selectedDirectoryNames = props.selectedDirectories.map(
  //     (item) => item.fullPath
  //   );
  //   const allFilePathsWithoutDuplicates = allFilePathInfoFromFolder.filter(
  //     (item) => !selectedDirectoryNames.includes(item.fullPath)
  //   );

  //   console.log(
  //     furthestDirectoryItem,
  //     selectedDirectoryNames,
  //     allFilePathInfoFromFolder,
  //     allFilePathsWithoutDuplicates
  //   );

  //   props.setSelectedDirectories((prevState) => [
  //     ...prevState,
  //     ...allFilePathsWithoutDuplicates,
  //   ]);

  //   console.log(props.selectedDirectories);
  // };

  // const deselectAllFilesHandler = () => {
  //   console.log("deselecting");
  //   const allFilePathInfoFromFolder = furthestDirectoryItem.map((item) => {
  //     return {
  //       fullPath: `${props.selectedStudy.server_path}/${props.filePath.join(
  //         "/"
  //       )}/${item.name}`,
  //       // fileName: item.name,
  //     };
  //   });

  //   // const selectedDirectoryNames = props.selectedDirectories.map(
  //   //   (item) => item.fullPath
  //   // );

  //   const test = allFilePathInfoFromFolder.map((item) => item.fullPath);

  //   const newDirectory = props.selectedDirectories.filter(
  //     (item) => !test.includes(item.fullPath)
  //   );
  //   console.log(
  //     allFilePathInfoFromFolder,
  //     props.selectedDirectories,
  //     // selectedDirectoryNames,
  //     newDirectory
  //   );

  //   props.setSelectedDirectories(newDirectory);
  // };

  // const checkMacrosJSX = (
  //   <div className="mt-4">
  //     <button
  //       className="border-2 dark:border-white px-3 py-1 rounded mr-2"
  //       onClick={selectAllFilesHandler}
  //     >
  //       Select All
  //     </button>
  //     <button
  //       className="border-2 dark:border-white px-3 py-1 rounded mr-2"
  //       onClick={deselectAllFilesHandler}
  //     >
  //       Deselect All
  //     </button>
  //   </div>
  // );

  return (
    <div className="mt-16">
      {/* <div className="border-2 border-salmonRed rounded dark:bg-cardDark text-blackTextLight dark:text-white w-80 h-16 px-4 absolute top-6 left-1/2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FontAwesomeIcon
            // icon={["far", "circle-xmark"]}
            icon="triangle-exclamation"
            size="xl"
            className="text-salmonRed"
          />
          <p>error popup</p>
        </div>
        <button>
          <FontAwesomeIcon icon="xmark" />
        </button>
      </div> */}
      <div className="flex justify-center gap-x-20">
        <div className="w-60 lg:w-64 xl:w-80">
          <h4 className="text-lg text-blackTextLight dark:text-white">
            Select Study
          </h4>
          <div className="mt-6 h-80 overflow-y-scroll">
            {DUMMY_AVAILABLE_STUDIES_JSX}
          </div>
        </div>
        <div className="w-60 lg:w-64 xl:w-80 text-blackTextLight dark:text-white">
          <div className="flex items-center gap-3">
            <h4 className="text-lg">Select Directory</h4>
          </div>
          <div className="mt-6 h-80 ">
            <div className="border-b-2 dark:border-white pb-3 flex items-center gap-x-4 gap-y-1 flex-wrap text-sm">
              <div>{initial_DUMMY_FILE_PATH_JSX}</div>
              {props.selectedStudy ? (
                <FontAwesomeIcon icon="chevron-right" />
              ) : (
                ""
              )}
              {DUMMY_FILE_PATH}
            </div>
            {props.selectedStudy && (
              <div>
                <div className="mt-3 pl-1 flex justify-between text-sm">
                  <p>File Name</p>
                  <p>Select</p>
                </div>
                {/* <form> */}
                <div className="mt-2 px-2 border-b-2 border-blackTextLight dark:border-white pb-4">
                  {DUMMY_FILE_EXPLORER_JSX}
                </div>
                {/* {furthestDirectoryItem.filter((item) => item.type === "video")
            .length !== 0
            ? checkMacrosJSX
          : ""} */}

                {/* </form> */}
                <div className="mt-4">
                  <p className="mb-2">Selected Directories:</p>
                  {DUMMY_SELECTED_DIRECTORIES_JSX}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 lg:mt-32 2xl:mt-48 relative">
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white bg-blackTextLight dark:bg-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
        </div>
        <div
          className="text-blackTextLight dark:text-white absolute right-20 md:right-40 xl:right-60 hover:underline underline-offset-4"
          onClick={continueHandler}
        >
          <p>Continue</p>
        </div>
        {/* <IngestionStartError
          hasError={hasError}
          setHasError={setHasError}
          errorMessage={errorMessage}
        /> */}
      </div>
    </div>
  );
};

export default IngestionStart;
