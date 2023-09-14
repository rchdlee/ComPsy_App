const TestForm = (props) => {
  // show form item if it is part of the selected file's metadata
  const hiddenBool = props.hidden;
  const display = hiddenBool ? "hidden" : "";
  //

  const fileName = props.fileName;
  const watchedFields = Object.entries(props.watchedFields).map(
    ([key, value]) => {
      return [key.slice(fileName.length), value];
      // return [key, value];
    }
  );

  // Render form items
  const formItems = props.inputData.map((field, index) => {
    const fieldName = field.name;
    const fieldOptions = field.options;

    const needsFilling = watchedFields[index][1] === "";

    const needsFillingStyles = `${
      needsFilling
        ? "border-salmonRedActive"
        : "border-blackTextLight dark:border-white"
    }`;

    if (field.type === "input") {
      return (
        <div className="flex flex-col first:mt-0 mt-3" key={index}>
          <label htmlFor={`${fileName}${fieldName}`}>{fieldName}</label>
          <input
            // {...props.register(`${fileName}${fieldName}`)}
            {...props.register(`${fileName}${fieldName}`)}
            // className={`bg-backgroundDark dark:autofill:shadow-[inset_0_0_0px_1000px_#222222] dark:autofill:text-fill-white dark:autofill:caret-white h-12 mt-2 px-3 border-2 ${needsFillingStyles} rounded`}
            className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 ${needsFillingStyles} rounded`}
            autoComplete="off"
            type="text"
            id={`${fileName}${fieldName}`}
          />
        </div>
      );
    }
    if (field.type === "select") {
      const reg = props.register(`${fileName}${fieldName}`);
      return (
        <div className="flex flex-col mt-3 first:mt-0" key={index}>
          <label htmlFor={`${fileName}${fieldName}`}>{fieldName}</label>
          <select
            // {...register(`${fileName}${fieldName}`).ref}
            ref={reg.ref}
            name={reg.name}
            onChange={(e) => reg.onChange(e)}
            className={`bg-white dark:bg-backgroundDark h-10 mt-1 px-3 border-2 ${needsFillingStyles} rounded`}
            id={`${fileName}${fieldName}`}
          >
            <option value="" disabled className="">
              -
            </option>
            {fieldOptions.map((option) => {
              return (
                <option value={option} key={`${fieldName}${option}`}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
      );
    }
  });

  return <div className={`${display}`}>{formItems}</div>;
};

export default TestForm;
