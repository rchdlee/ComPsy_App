const IngestionSelect = (props) => {
  const videoClickHandler = (e) => {
    console.log("clicked!", e.target.closest("div").id);
    const selectedVideoName = e.target.closest("div").id;

    if (props.videoListSelected?.includes(selectedVideoName)) {
      console.log("remove video");
      // const index = props.videoListSelected.findIndex(
      //   (name) => name === selectedVideoName
      // );

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
  const videoList = props.videoListFull.map((video) => {
    const selected = props.videoListSelected?.includes(video)
      ? "bg-lilacBlue"
      : "text-blackTextLight dark:text-white hover:bg-cardLight dark:hover:bg-cardDark";

    return (
      <div className="flex justify-center" key={video}>
        {/* <div className="w-1/2"></div> */}
        <div
          className={`w-96 border-2 border-blackTextLight dark:border-white rounded mb-2 h-10 flex items-center mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
          id={video}
          onClick={videoClickHandler}
        >
          {/* <input type="checkbox" /> */}
          <p>{video}</p>
        </div>
      </div>
    );
  });

  const selectAllFilesHandler = () => {
    props.setVideoListSelected(props.DUMMY_VIDEO_LIST_FROM_API);
  };

  const deselectAllFilesHandler = () => {
    props.setVideoListSelected([]);
  };

  const continueHandler = () => {
    if (props.videoListSelected.length === 0) {
      console.log("please select a video 🦁");
      props.throwNewErrorModal(
        "Please select at least one video for ingestion"
      );
      return;
    }

    props.setHasSelectedVideos(true);
    console.log("videos selected:", props.videoListSelected);

    setTimeout(() => {
      props.setMetadata(props.DUMMY_MISSING_METADATA);
    }, 1500);
  };

  const backButtonHandler = () => {
    props.setIsAtStart(true);
    props.setVideoListFull(null);
    props.setVideoListSelected([]);
  };

  return (
    <div className="mt-12 text-blackTextLight dark:text-white ">
      {/* <div className="flex justify-center"> */}
      <div>
        <h3 className="text-center text-lg bold">
          Select Videos for Ingestion:
        </h3>
        <div className="overflow-scroll w-96 h-96 mt-6 mx-auto">
          {videoList}
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
