import { useState, useEffect, Fragment } from "react";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TestForm from "./TestForm";

const IngestionMetadata = (props) => {
  // state for selected file
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  //

  const DUMMY_MISSING_METADATA = props.metadata;

  // Default values for useForm
  const defaultValues = {};
  DUMMY_MISSING_METADATA?.forEach((file) => {
    const fields = file.fields;
    const fileName = file.fileName;
    const dotIndex = fileName.indexOf(".");
    const fileNameNoExt = fileName.slice(0, dotIndex);
    fields.forEach((field) => {
      defaultValues[`${fileNameNoExt}${field.name}`] = field.value;
    });
  });
  //

  // RHF
  const { register, handleSubmit, watch } = useForm({
    defaultValues: defaultValues,
  });
  //

  // // Data Wrangling // //
  const ingestedFileNames = DUMMY_MISSING_METADATA?.map((file) => {
    return file.fileName;
  });
  // remove extension; '.' in name (in register in form) seems to cause error in data parsing for react-hook-form
  const ingestedFilesNoExt = ingestedFileNames?.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(0, dotIndex);
    return fileNameNoExt;
  });
  //

  // array of file extensions; for adding back extension into name in data object
  const fileExts = ingestedFileNames?.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(dotIndex);
    return fileNameNoExt;
  });
  //
  // //

  // watching input fields for completion
  const watchAllFields = watch();
  const watchAllFieldsByFile = ingestedFilesNoExt?.map((id, index) => {
    const formData = Object.fromEntries(
      Object.entries(watchAllFields).filter(([key]) => key.includes(id))
    );
    return formData;
  });
  //

  // Bool if all fields within all files have been completed - used to enable submit button
  const hasFilledEverything =
    Object.values(watchAllFields).filter((value) => value === "").length === 0;
  //

  // Select a file and show its metadata form
  const fileNameClickHandler = (e) => {
    const id = e.target.closest("#files > div").id;
    setSelectedFileIndex(id);
  };
  //

  // JSX for files that need metadata filled out
  const filesTest = ingestedFileNames?.map((file, index) => {
    const selectedBool = +selectedFileIndex === index;
    const classes = `${
      selectedBool
        ? "border-2 border-blackTextLight dark:border-white rounded"
        : ""
    }  px-8 h-16  mt-2 flex justify-between items-center hover:bg-cardLight dark:hover:bg-cardDark rounded`;

    const fileResults = watchAllFieldsByFile[index];
    const emptyIndices = Object.values(fileResults)
      .map((value, index) => {
        if (value === "") {
          return index;
        }
      })
      .filter((value) => value !== undefined);

    // bool for whether all metadata inputs for a file have been completed
    const hasCompletedAllItems = emptyIndices.length === 0 ? true : false;
    //

    return (
      <div
        className={classes}
        onClick={fileNameClickHandler}
        id={index}
        key={index}
      >
        <div className="flex gap-x-4 items-center text-blackTextLight dark:text-white">
          <FontAwesomeIcon icon={["far", "file-lines"]} className="h-6" />
          <p className="">{file}</p>
        </div>
        {hasCompletedAllItems ? (
          // <div>
          <FontAwesomeIcon icon="check" className="text-[#93DA7B]" size="xl" />
        ) : (
          // <p>check</p>
          // </div>
          ""
        )}
      </div>
    );
  });
  //

  // Render ALL metadata form items; only inputs for the selected file are shown
  const formsTest = DUMMY_MISSING_METADATA?.map((file, index) => {
    const fileName = file.fileName;
    const dotIndex = fileName.indexOf(".");
    const fileNameNoExt = fileName.slice(0, dotIndex);

    const inputData = file.fields;

    return (
      <TestForm
        watchedFields={watchAllFieldsByFile[index]}
        register={register}
        fileName={fileNameNoExt}
        inputData={inputData}
        hidden={+selectedFileIndex !== index}
        key={index}
      />
    );
  });
  //

  // // Controls // //
  const backButtonHandler = () => {
    props.setMetadata(null);
    props.setHasSelectedVideos(false);
  };

  // take form data and separate by file
  const onSubmit = (data) => {
    const dataUnformatted = data;
    const results = ingestedFilesNoExt?.map((id, index) => {
      const idLength = id.length;
      // console.log(idLength);
      const idInfo = { id: id + fileExts[index] };
      const formDataFormatted = Object.fromEntries(
        Object.entries(dataUnformatted)
          .filter(([key]) => key.includes(id))
          .map(([key, value]) => {
            return [key.slice(idLength), value];
          })
      );

      const fullDataObj = { ...idInfo, ...formDataFormatted };
      return fullDataObj;
    });

    // do something with results
    console.log("successfully submitted!! 🎉", results);
  };
  //
  // //

  return (
    <div>
      <div className="md:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto mt-16 flex justify-center gap-x-20">
        {/* <div className="w-96 text-blackTextLight dark:text-white"> */}
        <div className="w-60 lg:w-64 xl:w-80 text-blackTextLight dark:text-white">
          <h4 className="text-lg">
            Please fill in missing metadata for the following files:
          </h4>

          <div className="mt-6" id="files">
            {filesTest}
          </div>
        </div>
        <div className="w-px bg-blackTextLight dark:bg-white opacity-50"></div>

        <div className="w-60 lg:w-64 xl:w-80">
          <form className="text-blackTextLight dark:text-white">
            {formsTest}
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 lg:mt-32 2xl:mt-32 relative mx-auto">
        <button
          onClick={backButtonHandler}
          className="text-blackTextLight dark:text-white absolute left-20 md:left-40 xl:left-60 hover:underline underline-offset-4"
        >
          Back
        </button>
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white bg-blackTextLight dark:bg-white rounded-full"></div>
        </div>
        <div className="text-blackTextLight dark:text-white absolute right-16 md:right-36 xl:right-56 hover:underline underline-offset-4">
          <button
            className="px-8 py-4 border-2 border-black  bg-lilacBlue disabled:opacity-50 disabled:cursor-not-allowed text-blackTextLight "
            disabled={!hasFilledEverything}
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngestionMetadata;
