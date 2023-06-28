import { useState } from "react";
import { useForm, FormProvider, useFormState } from "react-hook-form";

import File from "../icons/File";
import GreenCheck from "../icons/GreenCheck";
import TestForm from "./TestForm";

const IngestionMetadata = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

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

  const defaultValues = {};

  DUMMY_MISSING_METADATA.forEach((file) => {
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

  const ingestedFileNames = DUMMY_MISSING_METADATA.map((file) => {
    return file.fileName;
  });
  // remove extension; '.' in name (in register in form) seems to cause error in data parsing for react-hook-form
  const ingestedFilesNoExt = ingestedFileNames.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(0, dotIndex);
    return fileNameNoExt;
  });
  // for adding back extension in data object
  const fileExts = ingestedFileNames.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(dotIndex);
    return fileNameNoExt;
  });

  // const watchAllFields = methods.watch();
  const watchAllFields = watch();
  const watchAllFieldsByFile = ingestedFilesNoExt.map((id, index) => {
    const formData = Object.fromEntries(
      Object.entries(watchAllFields)
        .filter(([key]) => key.includes(id))
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
    const results = ingestedFilesNoExt.map((id, index) => {
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
    console.log('successfully submitted!! 🎉', results);
  };

  const filesTest = ingestedFileNames.map((file, index) => {
    const selectedBool = +selectedFileIndex === index;
    const classes = `${
      selectedBool ? "border-2 border-white rounded" : ""
    }  px-8 h-16  mt-2 flex justify-between items-center hover:bg-cardDark`;

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
        <div className="flex gap-x-4">
          <File />
          <p className="">{file}</p>
        </div>
        {hasCompletedAllItems ? <GreenCheck /> : ""}
        {/* <GreenCheck /> */}
      </div>
    );
  });

  // const formsTest = ingestedFilesNoExt.map((file, index) => {
  const formsTest = DUMMY_MISSING_METADATA.map((file, index) => {
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

  // const testIDs = ["11", "222"];

  return (
    <div className="h-96 mt-16 flex justify-center gap-x-16">
      <div className="w-96 text-white">
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
          <button
            className="px-8 py-4 border-2 border-black mt-4 ml-24 bg-lilacBlue disabled:opacity-50 disabled:cursor-not-allowed text-blackTextLight "
            disabled={!hasFilledEverything}
            onClick={handleSubmit(onSubmit)}
          >
            submit (test)
          </button>
        </div>
      </div>
      <div className="w-px bg-white opacity-50"></div>

      {/* FORM */}
      {/* <div className="w-96 overflow-scroll pr-4"> */}
      <div className="w-96 ">
        {/* <FormProvider {...methods}> */}
        <form
          // onSubmit={methods.handleSubmit(onSubmit)}
          onSubmit={handleSubmit(onSubmit)}
          className="text-white"
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
        {/* <form
          className="text-white"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <label htmlFor="">Subject</label>
            <select
              {...register("subject")}
              className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
            >
              <option className="h-12" value="SC007">
                SC007
              </option>
              <option value="SC008">SC008</option>
              <option value="SC009">SC009</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Session</label>
            <input
              {...register("session")}
              className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
              type="text"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Task</label>
            <select
              {...register("task")}
              className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
            >
              <option className="h-12" value="CASS">
                CASS
              </option>
              <option value="Task 2">Task 2</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Acquisition</label>
            <select
              {...register("acquisition")}
              className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
            >
              <option className="h-12" value="Interested">
                Interested
              </option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Administration</label>
            <input
              {...register("administration")}
              className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
              type="text"
            />
          </div>
          <input
            className="px-8 py-4 border-2 border-white mt-4 hover:bg-lilacBlue hover:text-blackTextLight"
            type="submit"
          />
        </form> */}
      </div>
    </div>
  );
};

export default IngestionMetadata;
