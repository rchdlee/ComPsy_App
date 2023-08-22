import { useState, useEffect, Fragment } from "react";
import { useForm, FormProvider, useFormState } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import File from "../icons/File";
import GreenCheck from "../icons/GreenCheck";
import TestForm from "./TestForm";

const IngestionMetadata = (props) => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const DUMMY_MISSING_METADATA = props.metadata;

  // Default values for useForm
  const defaultValues = {};
  DUMMY_MISSING_METADATA?.forEach((file) => {
    const fields = file.fields;
    const fileName = file.fileName;
    const dotIndex = fileName.indexOf(".");
    const fileNameNoExt = fileName.slice(0, dotIndex);
    fields.forEach((field) => {
      // let defaultValue;
      // if (field.value === "" && field.type === "select") {
      // defaultValues[`${fileNameNoExt}${field.name}`] = "";
      // } else {
      defaultValues[`${fileNameNoExt}${field.name}`] = field.value;
      // }
    });
  });

  // const methods = useForm({
  //   defaultValues: defaultValues,
  // });
  const { register, handleSubmit, watch } = useForm({
    defaultValues: defaultValues,
  });

  // const ingestedFiles = ["file1.exts", "file2.ext", "verycoolfile3.ext32"];

  // console.log(defaultValues, "🍵");

  const ingestedFileNames = DUMMY_MISSING_METADATA?.map((file) => {
    return file.fileName;
  });
  // remove extension; '.' in name (in register in form) seems to cause error in data parsing for react-hook-form
  const ingestedFilesNoExt = ingestedFileNames?.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(0, dotIndex);
    return fileNameNoExt;
  });
  // for adding back extension in data object
  const fileExts = ingestedFileNames?.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(dotIndex);
    return fileNameNoExt;
  });

  // const watchAllFields = methods.watch();
  const watchAllFields = watch();
  const watchAllFieldsByFile = ingestedFilesNoExt?.map((id, index) => {
    const formData = Object.fromEntries(
      Object.entries(watchAllFields).filter(([key]) => key.includes(id))
      // .map(([key, value]) => {
      //   // return [key.slice(idLength), value];
      //   return [key, value];
      // })
    );
    return formData;
  });

  const hasFilledEverything =
    Object.values(watchAllFields).filter((value) => value === "").length === 0;
  // console.log(watchAllFieldsByFile, hasFilledEverything);

  const fileNameClickHandler = (e) => {
    const id = e.target.closest("#files > div").id;
    // console.log(id);
    setSelectedFileIndex(id);
  };

  const onSubmit = (data) => {
    // console.log(data, "this is unformatted data");
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
      // console.log(dataUnformatted, formDataFormatted);

      const fullDataObj = { ...idInfo, ...formDataFormatted };
      return fullDataObj;
    });

    // do something with results
    console.log("successfully submitted!! 🎉", results);
  };

  const filesTest = ingestedFileNames?.map((file, index) => {
    const selectedBool = +selectedFileIndex === index;
    const classes = `${
      selectedBool
        ? "border-2 border-blackTextLight dark:border-white rounded"
        : ""
    }  px-8 h-16  mt-2 flex justify-between items-center hover:bg-cardLight dark:hover:bg-cardDark rounded`;

    // const results = ingestedFilesNoExt.map((id, index) => {
    //   const idLength = id.length;
    //   // console.log(idLength);
    //   const idInfo = { id: id + fileExts[index] };
    //   const formDataFormatted = Object.fromEntries(
    //     Object.entries(watchAllFields)
    //       .filter(([key]) => key.includes(id))
    //       .map(([key, value]) => {
    //         // return [key.slice(idLength), value];
    //         return [key, value];
    //       })
    //   );
    //   // console.log(dataUnformatted, formDataFormatted);
    //   // const fullDataObj = { ...idInfo, ...formDataFormatted };
    //   // return fullDataObj;
    //   return formDataFormatted;
    // });

    const fileResults = watchAllFieldsByFile[index];
    const emptyIndices = Object.values(fileResults)
      .map((value, index) => {
        if (value === "") {
          return index;
        }
      })
      .filter((value) => value !== undefined);

    const hasCompletedAllItems = emptyIndices.length === 0 ? true : false;

    // console.log(emptyIndices, hasCompletedAllItems, "🥞");

    return (
      // <TestForm
      //   testid={file}
      //   hidden={selectedFileIndex === index}
      //   index={index}
      // />
      <div
        // className="border-2 border-white px-8 rounded h-16  mt-2 flex justify-between items-center hover:bg-cardDark"
        className={classes}
        onClick={fileNameClickHandler}
        id={index}
        key={index}
      >
        <div className="flex gap-x-4 items-center text-blackTextLight dark:text-white">
          <FontAwesomeIcon
            icon={["far", "file-lines"]}
            // size="lg"
            className="h-6"
          />
          {/* <File /> */}
          <p className="">{file}</p>
        </div>
        {hasCompletedAllItems ? <GreenCheck /> : ""}
        {/* <GreenCheck /> */}
      </div>
    );
  });

  // const formsTest = ingestedFilesNoExt.map((file, index) => {
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

  const backButtonHandler = () => {
    // props.setIsAtStart(true);
    props.setMetadata(null);
    props.setHasSelectedVideos(false);
  };

  // const testIDs = ["11", "222"];

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
            {/* <div className="border-2 border-white px-8 rounded h-16 flex justify-between items-center">
            <div className="flex gap-x-4">
            <File />
            <p className="">filename1.extension</p>
            </div>
            <GreenCheck />
          </div> */}
            {/* <div className="flex justify-center">
              <button
                className="px-8 py-4 border-2 border-black mt-16 xl:mt-8 bg-lilacBlue disabled:opacity-50 disabled:cursor-not-allowed text-blackTextLight "
                disabled={!hasFilledEverything}
                onClick={handleSubmit(onSubmit)}
              >
                Submit (test)
              </button>
            </div> */}
          </div>
        </div>
        <div className="w-px bg-blackTextLight dark:bg-white opacity-50"></div>

        {/* FORM */}
        {/* <div className="w-96 overflow-scroll pr-4"> */}
        {/* <div className="w-96 "> */}
        <div className="w-60 lg:w-64 xl:w-80">
          {/* <FormProvider {...methods}> */}
          <form
            // onSubmit={methods.handleSubmit(onSubmit)}
            // onSubmit={handleSubmit(onSubmit)}
            className="text-blackTextLight dark:text-white"
          >
            {formsTest}
            {/* <TestForm testid={"11"} hidden={true} />
            <TestForm testid={"222"} hidden={false} /> */}
            {/* <input
            className="px-8 py-4 border-2 border-black mt-4 bg-lilacBlue disabled:opacity-50 disabled:cursor-not-allowed text-blackTextLight "
            disabled={!hasFilledEverything}
            type="submit"
          /> */}
          </form>
          {/* </FormProvider> */}
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 lg:mt-32 2xl:mt-32 relative mx-auto">
        {/* <div className="flex items-center justify-center mt-16 lg:mt-32 2xl:mt-32 relative md:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto"> */}
        <button
          onClick={backButtonHandler}
          // className="mt-16 lg:mt-32 2xl:mt-48"
          // className="text-blackTextLight dark:text-white hover:underline underline-offset-4"
          className="text-blackTextLight dark:text-white absolute left-20 md:left-40 xl:left-60 hover:underline underline-offset-4"

          // className="text-blackTextLight dark:text-white absolute left-5 xl:left-12 2xl:left-24 hover:underline underline-offset-4"
        >
          Back
        </button>
        <div className="flex gap-2">
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white rounded-full"></div>
          <div className="w-3 h-3 border-2 border-blackTextLight dark:border-white bg-blackTextLight dark:bg-white rounded-full"></div>
        </div>
        <div
          // className="flex justify-center"
          className="text-blackTextLight dark:text-white absolute right-16 md:right-36 xl:right-56 hover:underline underline-offset-4"
        >
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
