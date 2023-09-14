import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IngestionSelect = (props) => {
  // Selecting Video Logic
  const videoClickHandler = (e) => {
    const selectedVideoName = e.target.closest("div").id;
    console.log(selectedVideoName, "🤩");

    if (props.videoListSelected?.includes(selectedVideoName)) {
      props.setVideoListSelected((prevState) =>
        prevState.filter((name) => name !== selectedVideoName)
      );
      return;
    }

    props.setVideoListSelected((prevState) => [
      ...prevState,
      selectedVideoName,
    ]);
  };
  //

  // List of Videos from selected directories JSX
  // const videoList = props.videoListFull.map((file) => {
  //   const selected = props.videoListSelected?.includes(file)
  //     ? "bg-lilacBlue"
  //     : "text-blackTextLight dark:text-white hover:bg-cardLight dark:hover:bg-cardDark";

  //   return (
  //     <div className="flex justify-center" key={file.fullPath}>
  //       {/* <div className="w-1/2"></div> */}
  //       <div
  //         className={`w-96 border-2 border-blackTextLight dark:border-white rounded mb-2 h-16 flex flex-col justify-center mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
  //         id={file.fullPath}
  //         onClick={videoClickHandler}
  //       >
  //         {/* <input type="checkbox" /> */}
  //         <p className="text-[10px]">{file.fullPath}</p>
  //         <p>{file.name}</p>
  //       </div>
  //     </div>
  //   );
  // });

  // list of files UPDATED (with new)
  const fileList = props.videoListFull.map((category) => {
    const videoFiles = category.files.filter(
      (file) => file.fileType === "video"
    );
    const audioFiles = category.files.filter(
      (file) => file.fileType === "audio"
    );
    return (
      <div key={category.directory}>
        <p className="text-lg my-2">{category.directory}</p>
        <div>
          <p className="ml-8 text-xs">Video Files</p>

          {videoFiles.map((file) => {
            const selected = props.videoListSelected?.includes(file.fullPath)
              ? "bg-lilacBlue"
              : "text-blackTextLight dark:text-white hover:bg-cardLight dark:hover:bg-cardDark";

            return (
              <div
                className={`ml-8 border-2 border-blackTextLight dark:border-white rounded mb-2 h-16 flex items-center gap-4  mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
                id={file.fullPath}
                key={file.fullPath}
                onClick={videoClickHandler}
              >
                {file.fileType === "video" && (
                  <FontAwesomeIcon icon="video" size="lg" />
                )}
                <div className="flex flex-col justify-center">
                  <p className="text-[10px]">{file.fullPath}</p>
                  <p>{file.name}</p>
                </div>
              </div>
            );
          })}
          <div>
            <p className="ml-8 text-xs">Audio Files</p>
          </div>
          {audioFiles.map((file) => {
            const selected = props.videoListSelected?.includes(file.fullPath)
              ? "bg-lilacBlue"
              : "text-blackTextLight dark:text-white hover:bg-cardLight dark:hover:bg-cardDark";

            return (
              <div
                className={`ml-8 border-2 border-blackTextLight dark:border-white rounded mb-2 h-16 flex items-center gap-4  mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
                id={file.fullPath}
                key={file.fullPath}
                onClick={videoClickHandler}
              >
                {file.fileType === "audio" && (
                  <FontAwesomeIcon icon="music" size="lg" />
                )}
                <div className="flex flex-col justify-center">
                  <p className="text-[10px]">{file.fullPath}</p>
                  <p>{file.name}</p>
                </div>
              </div>
            );
          })}

          {/* {category.files.map((file) => {
            const selected = props.videoListSelected?.includes(file.fullPath)
              ? "bg-lilacBlue"
              : "text-blackTextLight dark:text-white hover:bg-cardLight dark:hover:bg-cardDark";

            return (
              <div
                className={`ml-8 border-2 border-blackTextLight dark:border-white rounded mb-2 h-16 flex items-center gap-4  mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
                id={file.fullPath}
                key={file.fullPath}
                onClick={videoClickHandler}
              >
                {file.fileType === "video" && (
                  <FontAwesomeIcon icon="video" size="lg" />
                )}
                {file.fileType === "audio" && (
                  <FontAwesomeIcon icon="music" size="lg" />
                )}
                <div className="flex flex-col justify-center">
                  <p className="text-[10px]">{file.fullPath}</p>
                  <p>{file.name}</p>
                </div>
              </div>
            );
          })} */}
        </div>
      </div>
    );
  });
  //

  // Select Macros
  const selectAllFilesHandler = () => {
    // props.setVideoListSelected(props.DUMMY_VIDEO_LIST_FROM_API);
    // const concatArrays = (...arr) => {
    //   const res = arr.reduce((acc, val) => {
    //     return acc.concat(...val);
    //   }, []);
    //   return res;
    // };

    const DUMMY_FILENAMES = props.DUMMY_VIDEO_LIST_FROM_API.map((file) => {
      return file.fullPath;
    });

    // const allFileFullPaths = props.videoListFull.map((obj) => {
    //   return ...obj.files;
    // });

    // console.log(allFileFullPaths);

    // props.setVideoListSelected(props.DUMMY_VIDEO_LIST_FROM_API);
    props.setVideoListSelected(DUMMY_FILENAMES);
  };

  const deselectAllFilesHandler = () => {
    props.setVideoListSelected([]);
  };
  //

  // Navigation Controls
  const continueHandler = () => {
    if (props.videoListSelected.length === 0) {
      console.log("please select a video 🦁");
      props.throwNewErrorModal(
        "Please select at least one video for ingestion",
        "app"
      );
      return;
    }

    props.setHasSelectedVideos(true);
    props.setHasError(false);
    console.log("videos selected:", props.videoListSelected);

    setTimeout(() => {
      console.log("dummy 2", props.DUMMY_MISSING_METADATA_NEW);
      // props.setMetadata(props.DUMMY_MISSING_METADATA);
      props.setMetadata(props.DUMMY_MISSING_METADATA_NEW);
    }, 1500);
  };

  const backButtonHandler = () => {
    props.setHasError(false);
    props.setIsAtStart(true);
    props.setVideoListFull(null);
    props.setVideoListSelected([]);
  };
  //

  return (
    <div className="mt-12 text-blackTextLight dark:text-white ">
      {/* <div className="flex justify-center"> */}
      <div>
        <h3 className="text-center text-lg bold">
          Select Videos for Ingestion:
        </h3>
        <div className="overflow-scroll w-96 h-96 mt-6 mx-auto">
          {/* {videoList} */}
          {fileList}
        </div>
      </div>
      {/* </div> */}
      <div className="w-96 mt-4 mx-auto pt-6 border-t-2 border-blackTextLight dark:border-white flex justify-between items-center">
        <p>Total Selected: {props.videoListSelected.length}</p>
        <div className="flex justify-center gap-1">
          <button
            className="border-2 dark:border-white px-3 py-1 rounded mr-2"
            onClick={selectAllFilesHandler}
          >
            Select All
          </button>
          <button
            className="border-2 dark:border-white px-3 py-1 rounded mr-2"
            onClick={deselectAllFilesHandler}
          >
            Deselect All
          </button>
        </div>
      </div>
      <div className="mt-12 lg:mt-20 2xl:mt-24 flex justify-center px-32 relative">
        <button
          onClick={backButtonHandler}
          className="text-blackTextLight dark:text-white absolute left-20 md:left-40 xl:left-60 hover:underline underline-offset-4"
        >
          Back
        </button>
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white bg-blackTextLight dark:bg-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
        </div>
        <button
          onClick={continueHandler}
          className="text-blackTextLight dark:text-white absolute right-20 md:right-40 xl:right-60 hover:underline underline-offset-4"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default IngestionSelect;
