import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";

const IngestionMetadata2 = (props) => {
  const [page, setPage] = useState(1);
  const [formErrors, setFormErrors] = useState([]);

  const DUMMY_MISSING_METADATA = props.metadata;

  const numberOfCategoriesPerPage = 5;
  const numberOfPages =
    DUMMY_MISSING_METADATA.fields.length % numberOfCategoriesPerPage === 0
      ? DUMMY_MISSING_METADATA.fields.length / numberOfCategoriesPerPage
      : Math.floor(
          DUMMY_MISSING_METADATA.fields.length / numberOfCategoriesPerPage
        ) + 1;

  const testBOol =
    DUMMY_MISSING_METADATA.fields.length / numberOfCategoriesPerPage;

  console.log(testBOol, "🎟");
  // console.log(DUMMY_MISSING_METADATA, numberOfPages, "🐶");

  // Default values for useForm //
  const defaultValues = {};
  DUMMY_MISSING_METADATA?.metadata.forEach((file) => {
    const fields = file.fields;
    const fileName = file.fileName;
    const fileNameDotIndex = fileName.indexOf(".");
    const fileNameNoExt = fileName.slice(0, fileNameDotIndex);

    fields.forEach((field) => {
      defaultValues[`${fileNameNoExt}${field.name}`] = field.value;
    });
  });
  //

  // RHF //
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });
  //

  const fieldsWithErrors = Object.keys(errors);

  // Render Headings //
  const metadataHeadersJSX = DUMMY_MISSING_METADATA.fields.map(
    (field, index) => {
      const visible =
        Math.floor(index / numberOfCategoriesPerPage) + 1 === page;
      return (
        <p className={`w-40 ${visible ? "" : "hidden"} text-lg`}>
          {field.name}
          {field.required === true && "*"}
        </p>
      );
    }
  );
  //

  // Render Forms //
  const metadataFormsJSX = DUMMY_MISSING_METADATA.metadata.map((file) => {
    return (
      <div className="flex items-center justify-between mt-4">
        <p className="w-40 h-10">{file.fileName}</p>
        {file.fields.map((field, index) => {
          const visible =
            Math.floor(index / numberOfCategoriesPerPage) + 1 === page;

          const fileNameDotIndex = file.fileName.indexOf(".");
          const fileNameNoExt = file.fileName.slice(0, fileNameDotIndex);

          const registerName = `${fileNameNoExt}${field.name}`;
          // const hasError = formErrors.includes(registerName);
          const hasError = fieldsWithErrors.includes(registerName);

          const errorStyles = `${
            hasError
              ? // ? "border-salmonRed"
                "border-error"
              : "border-blackTextLight dark:border-white"
          }`;

          if (field.type === "text") {
            return (
              <input
                {...register(registerName, {
                  required: field.required,
                })}
                className={`w-40 ${
                  visible ? "" : "hidden"
                } bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 rounded ${errorStyles} `}
                type="text"
                id={registerName}
                key={registerName}
                autoComplete="off"
              />
            );
          }

          if (field.type === "select") {
            const reg = register(registerName, {
              required: field.required,
            });
            return (
              <select
                ref={reg.ref}
                name={reg.name}
                onChange={(e) => reg.onChange(e)}
                id={registerName}
                key={registerName}
                className={`w-40 ${
                  visible ? "" : "hidden"
                } bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 rounded ${errorStyles} `}
              >
                <option value="" disabled className="">
                  -
                </option>
                {field.options.map((option) => {
                  return (
                    // NOT SURE WHAT 'KEY' IS FOR
                    <option value={option} key={`${field.name}${option}`}>
                      {option}
                    </option>
                  );
                })}
              </select>
            );
          }

          if (field.type === "number") {
            return (
              <input
                {...register(registerName, {
                  required: field.required,
                })}
                className={`w-40 ${
                  visible ? "" : "hidden"
                } bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 rounded ${errorStyles}`}
                type="number"
                autoComplete="off"
                id={registerName}
                key={registerName}
              />
            );
          }
        })}
      </div>
    );
  });
  //

  // Controls //
  const setPageOneTest = () => {
    setPage(1);
  };
  const setPageTwoTest = () => {
    setPage(2);
  };

  const onSubmit = (data) => {
    console.log("submitted!!! 🎨", data);
  };

  const onError = (errors) => {
    console.log("submitted but with errors! ⛳", errors);
    // const fieldsWithErrors = Object.keys(errors);
    // setFormErrors(fieldsWithErrors);
    props.throwNewErrorModal("Need to fill out required (*) form items", "app");
  };

  //

  return (
    <div className="text-blackTextLight dark:text-white mt-12 mx-16 2xl:mx-32">
      <p>Please fill in the metadata for your selected files</p>
      {/* headings */}
      <div className="flex justify-between mt-8">
        <p className="w-40 text-lg">File Name</p>
        {metadataHeadersJSX}
      </div>
      {/* {page === 1 && (
        <div className="flex justify-between">
          <p className="w-40">File Name</p>
          <p className="w-40">Subject</p>
          <p className="w-40">Session</p>
          <p className="w-40">Task</p>
          <p className="w-40">Condition</p>
          <p className="w-40">Target</p>
        </div>
      )}
      {page === 2 && (
        <div className="flex justify-between">
          <p className="w-40">File Name</p>
          <p className="w-40">Run</p>
          <p className="w-40">Device</p>
          <p className="w-40">Channel</p>
          <p className="w-40">Modality</p>
          <p className="w-40">Notes</p>
        </div>
      )} */}
      {/*  */}
      {/* files */}
      <div className="mt-6">{metadataFormsJSX}</div>
      {/* {page === 1 && (
        <div>
          <div className="flex justify-between mt-4">
            <p className="w-40">Name 1</p>
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
          </div>
          <div className="flex justify-between mt-4">
            <p className="w-40">Name 2</p>
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
          </div>
        </div>
      )}
      {page === 2 && (
        <div>
          <div className="flex justify-between mt-4">
            <p className="w-40">Name 1</p>
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
          </div>
          <div className="flex justify-between mt-4">
            <p className="w-40">Name 2</p>
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
            <input className="w-40" type="text" />
          </div>
        </div>
      )} */}
      {/*  */}
      <div className="mt-8 flex justify-end">
        <div>
          <p className="text-right">
            Page: {page} / {numberOfPages}
          </p>
          <div className="mt-4 flex gap-4">
            <button
              className="px-4 py-2 border-lilacBlue text-lilacBlue dark:text-lilacBlue border-2  rounded"
              onClick={setPageOneTest}
            >
              <FontAwesomeIcon icon="chevron-left" />
            </button>
            <button
              className="px-4 py-2 border-lilacBlue text-lilacBlue dark:text-lilacBlue border-2 rounded"
              onClick={setPageTwoTest}
            >
              <FontAwesomeIcon icon="chevron-right" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-16 lg:mt-32 2xl:mt-48 relative mx-auto">
        <button
          // onClick={backButtonHandler}
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
          {/* <button
            className="px-8 py-4 border-2 border-black  bg-lilacBlue disabled:opacity-50 disabled:cursor-not-allowed text-blackTextLight "
            // disabled={!hasFilledEverything}
            // onClick={handleSubmit(onSubmit)}
          >
            Submit
          </button> */}
          <button
            className=" p-4 bg-lilacBlue text-white dark:text-blackTextLight"
            onClick={handleSubmit(onSubmit, onError)}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngestionMetadata2;
