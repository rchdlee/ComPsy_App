import { useState, useCallback, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IngestionStart = (props) => {
  // // Study Select // //
  const availableStudies = props.availableStudies;

  const studyClickHandler = (e) => {
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

  const availableStudiesJSX = availableStudies.map((study) => {
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
  // //

  // // Directory // //
  // need to change when making API request when selecting a study
  const DUMMY_DIRECTORY_FILES = props.fileExplorer;

  // state for the selected study's directory
  const [furthestDirectoryItem, setFurthestDirectoryItem] = useState(
    DUMMY_DIRECTORY_FILES
  );

  // Navigate to the root folder in the directory when clicking its name in the path
  const rootPathClickHandler = () => {
    setFurthestDirectoryItem(DUMMY_DIRECTORY_FILES);
    props.setFilePath([]);
  };
  //

  // Navigate to a (non-root) folder when clicking its name in the directory path
  const filePathClickHandler = (e) => {
    if (+e.target.id + 1 === pathDepth) {
      console.log("already on this folder");
      return;
    }
    console.log(pathDepth, e.target.id, e.target.innerHTML, props.filePath);
    // const newFoldersToDisplay = availableStudies
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
  //

  // Navigate inside a directory folder when clicking its name
  const fileClickHandler = (e) => {
    const index = e.target.closest("div").id;
    const subFolders = furthestDirectoryItem[index].subFolders;
    // const pathDepth = props.filePath.length;

    console.log("furthestdirectoryitem", furthestDirectoryItem);
    const selectedItem = furthestDirectoryItem[index];

    if (!subFolders) {
      console.log("end of path");
      props.throwNewErrorModal("No more directories inside this folder", "app");
      return;
    }

    props.setFilePath((prevState) => [...prevState, selectedItem.name]);
    setFurthestDirectoryItem(subFolders);
  };
  //

  // Root File Path JSX
  const rootFilePathJSX = props.selectedStudy ? (
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

  // Remaining File Path JSX
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
  //

  const pathDepth = props.filePath.length;

  // Selecting a Directory Logic
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
  //

  // File Explorer JSX
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
  //

  // Navigate to the parent folder of a selected directory on click
  const selectedDirectoryClickHandler = (e) => {
    // const filePath = e.target.closest("p").id;
    const filePath = e.target.closest("div").id;
    const serverPathLength = props.selectedStudy.server_path.length;
    const filePathWithoutServerPath = filePath.slice(serverPathLength + 1);
    const filePathWithoutServerPathArray = filePathWithoutServerPath.split("/");

    const pathLength = filePathWithoutServerPathArray.length;

    let parentFolder = props.fileExplorer;
    for (let i = 0; i < pathLength - 1; i++) {
      if (i === 0) {
        parentFolder = parentFolder.filter(
          (item) => item.name === filePathWithoutServerPathArray[i]
        )[0];
      }
      if (i > 0) {
        parentFolder = parentFolder.subFolders.filter(
          (item) => item.name === filePathWithoutServerPathArray[i]
        )[0];
      }
    }

    filePathWithoutServerPathArray.pop();
    const subFolders = parentFolder.subFolders;

    if (!subFolders) {
      console.log("no subfolders");
      setFurthestDirectoryItem(parentFolder);
      props.setFilePath(filePathWithoutServerPathArray);
      return;
    }

    setFurthestDirectoryItem(subFolders);
    props.setFilePath(filePathWithoutServerPathArray);
  };
  //

  // Remove a directory from the list
  const removeDirectoryFromSelectedHandler = (e) => {
    const filePath = e.target.closest("div").id;

    console.log("removing this video", filePath, props.selectedDirectories);

    // props.setSelectedDirectories((prevState) => {
    // prevState.filter((directory) => directory !== filePath);
    // prevState.filter((info) => info.fullPath !== filePath);
    // });

    props.setSelectedDirectories((prevState) =>
      // prevState.filter((info) => info.fileName !== inputName)
      prevState.filter((info) => info.fullPath !== filePath)
    );
  };
  //

  // Selected Directories JSX
  const DUMMY_SELECTED_DIRECTORIES_JSX = props.selectedDirectories.map(
    (item) => {
      return (
        <div
          key={item.fullPath}
          id={item.fullPath}
          className="flex items-center gap-2"
        >
          <button onClick={removeDirectoryFromSelectedHandler}>
            <FontAwesomeIcon
              icon="fa-x"
              size="sm"
              className="dark:text-cardLight hover:dark:text-salmonRed"
            />
          </button>
          <p
            className="text-xs hover:underline hover:cursor-pointer"
            // id={item.fullPath}
            onClick={selectedDirectoryClickHandler}
          >
            {item.fullPath}
          </p>
        </div>
      );
    }
  );
  //
  // //

  // // CONTROLS // //
  const deselectAllDirectoriesHandler = () => {
    props.setSelectedDirectories([]);
  };

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
  };
  // //

  return (
    <div className="mt-16">
      <div className="flex justify-center gap-x-20">
        <div className="w-60 lg:w-64 xl:w-80">
          <h4 className="text-lg text-blackTextLight dark:text-white">
            Select Study
          </h4>
          <div className="mt-6 h-80 overflow-y-scroll">
            {availableStudiesJSX}
          </div>
        </div>
        <div className="w-60 lg:w-64 xl:w-80 text-blackTextLight dark:text-white">
          <div className="flex items-center gap-3">
            <h4 className="text-lg">Select Directory</h4>
          </div>
          <div className="mt-6 h-80 ">
            <div className="border-b-2 dark:border-white pb-3 flex items-center gap-x-4 gap-y-1 flex-wrap text-sm">
              <div>{rootFilePathJSX}</div>
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
                <div className="mt-2 px-2 border-b-2 border-blackTextLight dark:border-white pb-4">
                  {DUMMY_FILE_EXPLORER_JSX}
                </div>
                <div className="mt-4">
                  <p className="mb-2">Selected Directories:</p>
                  {DUMMY_SELECTED_DIRECTORIES_JSX}
                  {props.selectedDirectories.length !== 0 && (
                    <button
                      className="mt-4 px-3 py-2 border-2 border-blackTextLight dark:border-white rounded text-sm hover:bg-lilacBlue hover:text-white dark:hover:text-blackTextLight"
                      onClick={deselectAllDirectoriesHandler}
                    >
                      Unselect All
                    </button>
                  )}
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
      </div>
    </div>
  );
};

export default IngestionStart;
