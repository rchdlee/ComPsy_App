import { useFormContext } from "react-hook-form";

const TestForm = (props) => {
  // const { register } = useFormContext(); // retrieve all hook methods

  const hiddenBool = props.hidden;
  const display = hiddenBool ? "hidden" : "";

  const fileName = props.testid;
  // const dotIndex = fileName.indexOf(".");
  // const fileNameNoExt = fileName.slice(0, dotIndex);

  const changeHandlerTest = (e) => {
    console.log(e);
  };

  const blurHandlerTest = () => {
    console.log("blurred");
  };

  return (
    <div className={`${display}`}>
      {/* <form className="text-white" action="" onSubmit={handleSubmit(onSubmit)}> */}
      <div className="flex flex-col">
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
      </div>
      {/* <input
        className="px-8 py-4 border-2 border-white mt-4 hover:bg-lilacBlue hover:text-blackTextLight"
        type="submit"
      /> */}
      {/* </form> */}
    </div>
  );
};

export default TestForm;