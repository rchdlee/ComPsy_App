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
    console.log("clicked continue!");
    // setTimeout(() => {
    //   props.setMetadata(DUMMY_MISSING_METADATA);
    // }, 500);
  };

  const studyClickHandler = (e) => {
    // console.log(e.target.innerHTML);
    const studyName = e.target.innerHTML;
    const selectedStudyData = props.availableStudies.filter(
      (study) => study.name === studyName
    )[0];

    console.log(selectedStudyData, "😎");

    props.setSelectedStudy(selectedStudyData);
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
    let test = DUMMY_DIRECTORY_FILES;
    for (let i = 0; i < +e.target.id + 1; i++) {
      console.log(`i = ${i}`);
      test = test.filter((item) => item.name === props.filePath[i])[0]
        .subFolders;
      console.log(test);
    }
    console.log(test, "🤖");
    props.setFilePath((prevState) => prevState.slice(0, +e.target.id + 1));
    setFurthestDirectoryItem(test);
  };

  const rootPathClickHandler = () => {
    setFurthestDirectoryItem(DUMMY_DIRECTORY_FILES);
    props.setFilePath([]);
  };

  // const DUMMY_FILE_PATH_JSX = filePath;
  const initial_DUMMY_FILE_PATH_JSX = props.selectedStudy ? (
    <p className="hover:underline" onClick={rootPathClickHandler}>
      {props.selectedStudy.server_path}
    </p>
  ) : (
    <p>Please select a study to view its child directories</p>
  );

  const DUMMY_FILE_PATH = props.filePath.map((pathName, index) => {
    return (
      <div className="flex items-center gap-3">
        <p
          key={index}
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
  console.log(pathDepth, props.filePath, "💩");

  // const subFolderTest = props.filePath.reduce(
  //   (accumulator, currentValue) =>
  //     accumulator.filter((file) => file.name === currentValue),
  //   DUMMY_AVAILABLE_STUDIES_JSX
  // );
  // let subFolderTest = DUMMY_DIRECTORY_FILES;
  // console.log("INITIAL", subFolderTest);
  // for (let i = 0; i <= pathDepth; i++) {
  //   const currentPathToBeSearchedFor = props.filePath[i];
  //   console.log(currentPathToBeSearchedFor, i, "🐺", subFolderTest);
  //   const testIndex = subFolderTest.findIndex(
  //     (file) => file.name === currentPathToBeSearchedFor
  //   );
  //   console.log("testindex", testIndex);
  //   subFolderTest = subFolderTest[testIndex];
  // }
  // console.log(subFolderTest, "🐠");

  const DUMMY_FILE_EXPLORER_JSX = props.selectedStudy
    ? furthestDirectoryItem.map((folder, index) => {
        return (
          <div
            className="flex gap-3 items-center group"
            id={index}
            key={index}
            onClick={fileClickHandler}
          >
            <FontAwesomeIcon icon="fa-folder" />
            <p className="group-hover:underline">{folder.name}</p>
          </div>
        );
      })
    : "";

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
            <div className="border-b-2 dark:border-white pb-3 flex items-center gap-4 flex-wrap text-sm">
              <div>{initial_DUMMY_FILE_PATH_JSX}</div>
              {props.selectedStudy ? (
                <FontAwesomeIcon icon="chevron-right" />
              ) : (
                ""
              )}
              {DUMMY_FILE_PATH}
            </div>
            <div className="mt-2 pl-3">{DUMMY_FILE_EXPLORER_JSX}</div>
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
          // onClick={handleSubmit(onSubmit)}
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
