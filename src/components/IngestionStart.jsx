import { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import IngestionStartError from "./IngestionStartError";

const IngestionStart = (props) => {
  // const [selectedStudy, setSelectedStudy] = useState(null);
  // const [uploadedFiles, setUploadedFiles] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [hasAddFileError, setHasAddFileError] = useState(false);

  const filePaths = props.filePaths;
  const defaultValues = {};
  const filePathsLength = filePaths?.length;
  const registerInputsArray = [];

  filePaths?.forEach((path, index) => (defaultValues[index] = path));

  for (let i = 0; i < filePathsLength; i++) {
    registerInputsArray.push(i.toString());
  }

  const initialInputs = filePathsLength ? registerInputsArray : ["0"];

  const { register, watch, handleSubmit, unregister } = useForm({
    defaultValues: defaultValues,
  });
  const [inputs, setInputs] = useState(initialInputs);

  const watchAllFields = watch();
  const inputValues = Object.values(watchAllFields);

  const addFileInputHandler = () => {
    const length = inputs.length;
    const newNumber = +inputs[length - 1] + 1;

    // for preventing adding a new input if the last one is empty
    if (!inputValues[length - 1]) {
      // NEED ERROR POPUP
      // console.log("please add a file path before adding a new one");
      setHasAddFileError(true);
      return;
    }
    setHasAddFileError(false);
    setInputs((prevState) => [...prevState, newNumber.toString()]);
  };

  const inputDeleteHandler = (e) => {
    const id = e.target.id;
    unregister(id);
    setInputs((prevState) => prevState.filter((inputID) => inputID !== id));
  };

  const fileInputs = inputs.map((input, index) => {
    return (
      <div className="flex items-center gap-4 first:mt-0 mt-2" key={input}>
        <label htmlFor="">{index + 1}.</label>
        <input
          {...register(input)}
          className={`bg-white dark:bg-backgroundDark h-10 w-80 px-3 border-2 border-cardDark dark:border-white rounded`}
          autoComplete="off"
          type="text"
        />
        {/* {index !== 0 && ( */}
        <button
          onClick={inputDeleteHandler}
          id={input}
          className={`${index === 0 && "opacity-0"}`}
        >
          X
        </button>
        {/* )} */}
      </div>
    );
  });

  // for file upload

  // const onDrop = useCallback((acceptedFiles) => {
  //   // Do something with the files
  //   console.log(acceptedFiles);

  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader();
  //     console.log(reader);

  //     reader.onabort = () => console.log("file reading was aborted");
  //     reader.onerror = () => console.log("file reading has failed");
  //     reader.onload = () => {
  //       // Do whatever you want with the file contents
  //       const binaryStr = reader.result;
  //       console.log(binaryStr);
  //     };
  //     reader.readAsArrayBuffer(file);
  //   });
  // }, []);
  // const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
  //   useDropzone({ onDrop });

  // const files = acceptedFiles.map((file) => (
  //   <li key={file.path}>
  //     {file.path} - {file.size} bytes
  //   </li>
  // ));

  //

  // const DUMMY_AVAILABLE_STUDIES = [
  //   "Study 1",
  //   "Study 2",
  //   "Social Coordination",
  //   "Study 4",
  //   "Study 5",
  //   "Study 6",
  // ];

  const DUMMY_AVAILABLE_STUDIES = props.availableStudies;

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

  const studyClickHandler = (e) => {
    // console.log(e.target.innerHTML);
    props.setSelectedStudy(e.target.innerHTML);
  };

  // const continueHandler = () => {
  //   props.setIsAtStart(false);
  //   console.log(props.selectedStudy, watchAllFields);
  //   setTimeout(() => {
  //     props.setMetadata(DUMMY_MISSING_METADATA);
  //   }, 500);
  // };

  const createContinueError = (message) => {
    setHasError(true);
    setErrorMessage(message);
  };

  const onSubmit = (data) => {
    setHasError(false);
    if (!props.selectedStudy) {
      if (!Object.values(watchAllFields)[0]) {
        createContinueError("Please select a study & add at least 1 file!");
        return;
      }
      createContinueError("Please select a study!");
      return;
    }
    if (!Object.values(watchAllFields)[0]) {
      createContinueError("Please add at least 1 file!");
      return;
    }

    props.setIsAtStart(false);
    const filePaths = Object.values(data).filter((path) => path !== "");
    props.setFilePaths(filePaths);
    console.log(props.selectedStudy, filePaths);
    setTimeout(() => {
      props.setMetadata(DUMMY_MISSING_METADATA);
    }, 500);
  };

  // const handleFileInput = () => {};
  const addFileErrorCloseHandler = () => {
    setHasAddFileError(false);
  };

  const DUMMY_AVAILABLE_STUDIES_JSX = DUMMY_AVAILABLE_STUDIES.map((study) => {
    const selected =
      props.selectedStudy === study
        ? "bg-lilacBlue"
        : "text-blackTextLight dark:text-white hover:bg-cardLight dark:hover:bg-cardDark";

    return (
      <div
        key={study}
        onClick={studyClickHandler}
        className={`border-2 border-blackTextLight dark:border-white rounded h-14 flex items-center mt-2 first:mt-0 pl-4 mr-1 ${selected}`}
      >
        {study}
      </div>
    );
  });

  return (
    <div className="mt-16">
      <div className="flex justify-center gap-x-20">
        <div className="w-80">
          <h4 className="text-lg text-blackTextLight dark:text-white">
            Select Study
          </h4>
          <div className="mt-6 h-80 overflow-y-scroll">
            {DUMMY_AVAILABLE_STUDIES_JSX}
          </div>
        </div>
        {/*  */}
        <div className="w-80 text-blackTextLight dark:text-white">
          <div className="flex items-center gap-3">
            <h4>Paste File Path(s)</h4>
            {/* ADD ON HOVER TOOLTOP FOR COPYING FILE PATH */}
            <p className="text-xs w-5 h-5 border-blackTextLight dark:border-cardLight border-2 rounded-full flex justify-center items-center">
              ?
            </p>
          </div>
          <div className="mt-6 h-80 flex flex-col justify-between">
            <div className="flex flex-col first:mt-0 mt-4">{fileInputs}</div>
            <div className="flex flex-col items-center mb-4">
              <div className={`relative ${hasAddFileError ? "" : "hidden"}`}>
                <div className="flex flex-col items-center ">
                  <div className="w-40 h-24 bg-cardDark px-4 py-4 text-white text-sm">
                    <p>Please paste in a file path before adding a new one!</p>
                  </div>
                  <div
                    className="w-0 h-0 mb-2
                  border-l-[14px] border-l-transparent
                  border-t-[20px] border-t-cardDark
                  border-r-[14px] border-r-transparent"
                  ></div>
                </div>
                <button
                  onClick={addFileErrorCloseHandler}
                  className="text-sm absolute top-[-12px] right-[-8px] bg-salmonRed h-5 w-5 rounded-full flex justify-center items-center"
                >
                  X
                </button>
              </div>
              <button
                onClick={addFileInputHandler}
                className="relative hover:bg-lilacBlue hover:text-blackTextLight p-2 border-2 border-cardDark dark:border-white rounded"
              >
                + Add another file
              </button>
            </div>
          </div>
        </div>
        {/* old file upload */}
        {/* <div className="w-80 text-blackTextLight dark:text-white">
          <h4>Upload File(s)</h4>
          <div className="mt-8 border-2">
            <div {...getRootProps()} className="h-64">
              <input {...getInputProps()} onChange={handleFileInput} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <div>
                  <p>Drag 'n' drop some files here, or click to select files</p>
                  <button className="bg-lilacBlue w-24 h-12 rounded text-blackTextLight font-semibold">
                    Browse
                  </button>
                </div>
              )}
              <aside>
                <h4>Files</h4>
                <ul>{files}</ul>
              </aside>
              <a href="C:\Users\richa\OneDrive\Desktop\fun\favoritegames\maggie.jpg"></a>
            </div>
          </div>
        </div> */}
      </div>
      <div className="flex items-center justify-center mt-32 relative">
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white bg-blackTextLight dark:bg-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
        </div>
        <div
          className="text-blackTextLight dark:text-white absolute right-60 hover:underline underline-offset-4"
          // onClick={continueHandler}
          onClick={handleSubmit(onSubmit)}
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
