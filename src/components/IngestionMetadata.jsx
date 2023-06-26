import { useState } from "react";
import { useForm, FormProvider, useFormState } from "react-hook-form";

import File from "../icons/File";
import GreenCheck from "../icons/GreenCheck";
import TestForm from "./TestForm";

const IngestionMetadata = () => {
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  // const methods = useForm();
  const { register, handleSubmit } = useForm();

  const ingestedFiles = ["file1.exts", "file2.ext", "verycoolfile3.ext32"];
  // remove extension; '.' in name (in register in form) seems to cause error in data parsing for react-hook-form
  const ingestedFilesNoExt = ingestedFiles.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(0, dotIndex);
    return fileNameNoExt;
  });
  // for adding back extension in data object
  const fileExts = ingestedFiles.map((file) => {
    const dotIndex = file.indexOf(".");
    const fileNameNoExt = file.slice(dotIndex);
    return fileNameNoExt;
  });

  // console.log(fileExts);

  const fileNameClickHandler = (e) => {
    const id = e.target.closest("#files > div").id;
    // console.log(id);
    setSelectedFileIndex(id);
  };

  const onSubmit = (data) => {
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
      console.log(dataUnformatted, formDataFormatted);

      const fullDataObj = { ...idInfo, ...formDataFormatted };
      return fullDataObj;
    });
    console.log(results);
  };

  const filesTest = ingestedFiles.map((file, index) => {
    const selectedBool = +selectedFileIndex === index;
    const classes = `${
      selectedBool ? "border-2 border-white rounded" : ""
    }  px-8 h-16  mt-2 flex justify-between items-center hover:bg-cardDark`;

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
        {/* <GreenCheck /> */}
      </div>
    );
  });

  const formsTest = ingestedFilesNoExt.map((file, index) => {
    return (
      <TestForm
        register={register}
        testid={file}
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
        </div>
      </div>
      <div className="w-px bg-white opacity-50"></div>

      {/* FORM */}
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
          <input
            className="px-8 py-4 border-2 border-white mt-4 hover:bg-lilacBlue hover:text-blackTextLight"
            type="submit"
          />
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
