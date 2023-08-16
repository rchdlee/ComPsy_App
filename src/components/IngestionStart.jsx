import { useState, useCallback, useRef } from "react";

import IngestionStartError from "./IngestionStartError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IngestionStart = (props) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
    console.log("clicked continue!", selectedDirectories);
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

  console.log(DUMMY_DIRECTORY_FILES, furthestDirectoryItem, "😎😋");

  const fileClickHandler = (e) => {
    const index = e.target.closest("div").id;
    const subFolders = furthestDirectoryItem[index].subFolders;
    const pathDepth = props.filePath.length;

    const selectedItem = furthestDirectoryItem[index];

    console.log(
      "file clicked",
      "depth",
      pathDepth,
      "index",
      index,
      selectedItem,
      selectedItem.name,
      subFolders
    );

    if (!subFolders) {
      console.log("end of path");
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
      className="hover:underline"
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
          className="hover:underline"
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

  const [selectedDirectories, setSelectedDirectories] = useState([]);

  const testInputClickHandler = (e) => {
    const isChecked = e.target.checked;
    const inputName = e.target.closest("input").id;
    const filePathFull = `${
      props.selectedStudy.server_path
    }/${props.filePath.join("/")}/${inputName}`;

    console.log(e, isChecked, inputName, filePathFull);
    const filePathInfo = {
      fullPath: filePathFull,
      fileName: inputName,
    };

    if (isChecked) {
      console.log("just checked the box!");
      setSelectedDirectories((prevState) => [...prevState, filePathInfo]);
    }
    if (!isChecked) {
      console.log("just UNCHEKED the box!");
      setSelectedDirectories((prevState) =>
        // prevState.filter((info) => info.fileName !== inputName)
        prevState.filter((info) => info.fullPath !== filePathFull)
      );
    }
  };

  const DUMMY_FILE_EXPLORER_JSX = props.selectedStudy
    ? furthestDirectoryItem.map((item, index) => {
        const filePathFull = `${
          props.selectedStudy.server_path
        }/${props.filePath.join("/")}/${item.name}`;

        if (item.type === "folder") {
          return (
            <div
              className="flex gap-3 items-center group"
              id={index}
              key={index}
              onClick={fileClickHandler}
            >
              <FontAwesomeIcon icon="fa-folder" />
              <p className="group-hover:underline">{item.name}</p>
            </div>
          );
        }
        if (item.type === "video") {
          return (
            <div
              className="flex gap-3 items-center group"
              id={index}
              key={index}
              // onClick={fileClickHandler}
            >
              <input
                className="mt-0.5"
                type="checkbox"
                id={item.name}
                // onClick={testInputClickHandler}
                onChange={testInputClickHandler}
                checked={
                  !(
                    selectedDirectories.filter(
                      // (path) => path.fileName === item.name
                      (path) => path.fullPath === filePathFull
                    ).length === 0
                  )
                }
              />
              <label htmlFor={item.name} className="group-hover:underline">
                {item.name}
              </label>
              {/* <p className="group-hover:underline">{item.name}</p> */}
            </div>
          );
        }
      })
    : "";

  const selectAllFilesHandler = () => {
    const allFilePathInfoFromFolder = furthestDirectoryItem.map((item) => {
      return {
        fullPath: `${props.selectedStudy.server_path}/${props.filePath.join(
          "/"
        )}/${item.name}`,
        fileName: item.name,
      };
    });
    const selectedDirectoryNames = selectedDirectories.map(
      (item) => item.fileName
    );
    const allFilePathsWithoutDuplicates = allFilePathInfoFromFolder.filter(
      (item) => !selectedDirectoryNames.includes(item.fileName)
    );

    // console.log(
    //   furthestDirectoryItem,
    //   selectedDirectoryNames,
    //   allFilePathInfoFromFolder,
    //   allFilePathsWithoutDuplicates
    // );

    setSelectedDirectories((prevState) => [
      ...prevState,
      ...allFilePathsWithoutDuplicates,
    ]);
  };

  const checkMacrosJSX = (
    <div className="mt-4">
      <button
        className="border-2 dark:border-white px-3 py-1 rounded mr-2"
        onClick={selectAllFilesHandler}
      >
        Select All
      </button>
      <button className="border-2 dark:border-white px-3 py-1 rounded mr-2">
        Deselect All
      </button>
    </div>
  );

  return (
    <div className="mt-16">
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
            {/* <form> */}
            <div className="mt-2 pl-3">{DUMMY_FILE_EXPLORER_JSX}</div>
            {furthestDirectoryItem.filter((item) => item.type === "video")
              .length !== 0
              ? checkMacrosJSX
              : ""}

            {/* </form> */}
            <div>
              {selectedDirectories.map((item) => {
                return (
                  <p className="text-xs" key={item.fullPath}>
                    {item.fullPath}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 lg:mt-32 2xl:mt-48 relative">
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white bg-blackTextLight dark:bg-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
        </div>
        <div
          className="text-blackTextLight dark:text-white absolute right-20 md:right-40 xl:right-60 hover:underline underline-offset-4"
          onClick={continueHandler}
        >
          <p>Continue</p>
        </div>
        <IngestionStartError
          hasError={hasError}
          setHasError={setHasError}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};

export default IngestionStart;
