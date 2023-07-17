import { useFormContext, Controller } from "react-hook-form";
import Select from "react-select";

const TestForm = (props) => {
  // const { register, control } = useFormContext(); // retrieve all hook methods

  const hiddenBool = props.hidden;
  const display = hiddenBool ? "hidden" : "";

  const fileName = props.fileName;
  const watchedFields = Object.entries(props.watchedFields).map(
    ([key, value]) => {
      return [key.slice(fileName.length), value];
      // return [key, value];
    }
  );

  // console.log(watchedFields, "🎃");

  const formItems = props.inputData.map((field, index) => {
    const fieldName = field.name;
    const fieldOptions = field.options;

    // const needsFilling = field.value === "";
    // console.log(fieldName);

    const needsFilling = watchedFields[index][1] === "";
    // const needsFilling = false;

    const needsFillingStyles = `${
      needsFilling
        ? "border-salmonRedActive"
        : "border-blackTextLight dark:border-white"
    }`;

    // if (fieldOptions) {
    //   fieldOptions.unshift("-- select --");
    // }

    if (field.type === "input") {
      return (
        <div className="flex flex-col first:mt-0 mt-4" key={index}>
          <label htmlFor={`${fileName}${fieldName}`}>{fieldName}</label>
          <input
            // {...props.register(`${fileName}${fieldName}`)}
            {...props.register(`${fileName}${fieldName}`)}
            // className={`bg-backgroundDark dark:autofill:shadow-[inset_0_0_0px_1000px_#222222] dark:autofill:text-fill-white dark:autofill:caret-white h-12 mt-2 px-3 border-2 ${needsFillingStyles} rounded`}
            className={`bg-white dark:bg-backgroundDark h-12 mt-2 px-3 border-2 ${needsFillingStyles} rounded`}
            autoComplete="off"
            type="text"
            id={`${fileName}${fieldName}`}
          />
        </div>
      );
    }
    if (field.type === "select") {
      // const fieldOptionsWithSelect = field.options;
      // fieldOptionsWithSelect.unshift("-- select  --");

      // const selectOptions = field.options.map((option) => {
      //   return { value: option, label: option };
      // });
      // console.log(selectOptions);
      const reg = props.register(`${fileName}${fieldName}`);

      return (
        <div className="flex flex-col mt-4 first:mt-0" key={index}>
          <label htmlFor={`${fileName}${fieldName}`}>{fieldName}</label>
          <select
            // {...register(`${fileName}${fieldName}`).ref}
            ref={reg.ref}
            name={reg.name}
            onChange={(e) => reg.onChange(e)}
            className={`bg-white dark:bg-backgroundDark h-12 mt-2 px-3 border-2 ${needsFillingStyles} rounded`}
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
          {/* <Controller
            control={control}
            name={`${fileName}${fieldName}`}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <Select
                options={selectOptions}
                ref={ref}
                onChange={onChange}
                value={value}
                styles={{
                  option: (base) => ({
                    ...base,
                    backgroundColor: "#222222",
                    color: "white",
                  }),
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#222222",
                    height: "48px",
                    border: "2px solid white",
                    marginTop: "8px",
                  }),
                  // placeholder: (base) => {
                  //   return {
                  //     ...base,
                  //     color: "#d1d1d1",
                  //   };
                  // },
                  singleValue: (base) => {
                    return {
                      ...base,
                      color: "#ffffff",
                    };
                  },
                  input: (base) => ({
                    ...base,
                    color: "white",
                  }),
                }}
              />
            )}
          /> */}
        </div>
      );
    }
  });

  return (
    <div className={`${display}`}>
      {/* <form className="text-white" action="" onSubmit={handleSubmit(onSubmit)}> */}
      {formItems}
      {/* <div className="flex flex-col">
        <label htmlFor="">{fileName} - Subject</label>
        <select
          {...props.register(`${fileName}subject`)}
          onChange={changeHandlerTest}
          onBlur={blurHandlerTest}
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
        <label htmlFor="">session</label>
        <input
          {...props.register(`${fileName}session`)}
          onBlur={blurHandlerTest}
          className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
          type="text"
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="">Task</label>
        <select
          {...props.register(`${fileName}task`)}
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
          {...props.register(`${fileName}acquisition`)}
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
          {...props.register(`${fileName}adminitration`)}
          className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
          type="text"
        />
      </div> */}
      {/* <input
        className="px-8 py-4 border-2 border-white mt-4 hover:bg-lilacBlue hover:text-blackTextLight"
        type="submit"
      /> */}
      {/* </form> */}
    </div>
  );
};

export default TestForm;
