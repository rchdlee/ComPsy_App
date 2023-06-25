import File from "../icons/File";
import GreenCheck from "../icons/GreenCheck";

const IngestionMetadataTest = () => {
  const DUMMY_MISSING_METADATA = [
    {
      fileName: "file1.ext",
      study: "Study 1",
      fields: [
        {
          name: "Subject",
          type: "select",
          options: ["1", "3", "5", "7"],
        },
        {
          name: "TaskID",
          type: "select",
          options: ["1", "2", "3"],
        },
        { name: "Session", type: "input", options: "n/a" },
        {
          name: "Acquisition",
          type: "select",
          options: ["Interested", "Not Interested"],
        },
        { name: "Administration", type: "input", options: "n/a" },
        { name: "Device", type: "input", options: "n/a" },
      ],
    },
    {
      fileName: "file2.ext",
      study: "Study 2",
      fields: [
        {
          name: "Subject",
          type: "select",
          options: ["2", "4", "6", "8"],
        },
        {
          name: "TaskID",
          type: "select",
          options: ["4", "5", "6"],
        },
        { name: "Session2", type: "input", options: "n/a" },
        {
          name: "Acquisition",
          type: "select",
          options: ["Interested!", "Not Interested!"],
        },
        { name: "Administration2", type: "input", options: "n/a" },
        { name: "Device2", type: "input", options: "n/a" },
      ],
    },
    {
      fileName: "file3.ext",
      study: "Study 3",
      fields: [
        {
          name: "Subject",
          type: "select",
          options: ["2.5", "4.5", "6.5", "8.5"],
        },
        {
          name: "TaskID",
          type: "select",
          options: ["7", "8", "9"],
        },
        { name: "Session3", type: "input", options: "n/a" },
        {
          name: "Acquisition",
          type: "select",
          options: ["Interested!!", "Not Interested!!"],
        },
        { name: "Administration3", type: "input", options: "n/a" },
        { name: "Device3", type: "input", options: "n/a" },
      ],
    },
  ];


  return (
    <div className="h-96 mt-16 flex justify-center gap-x-16">
      <div className="w-96 text-white">
        <h4 className="text-lg">
          Please fill in missing metadata for the following files:
        </h4>
        <div className="mt-6">
          <div className="border-2 border-white px-8 rounded h-16 flex justify-between items-center">
            <div className="flex gap-x-4">
              <File />
              <p className="">filename1.extension</p>
            </div>
            <GreenCheck />
          </div>
        </div>
      </div>
      <div className="w-px bg-white opacity-50"></div>

      {/* FORM */}
      <div className="w-96 ">
        <form className="text-white" action="">
          <div className="flex flex-col">
            <label htmlFor="">Subject</label>
            <select className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded">
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
              className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
              type="text"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Task</label>
            <select className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded">
              <option className="h-12" value="CASS">
                CASS
              </option>
              <option value="Task 2">Task 2</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Acquisition</label>
            <select className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded">
              <option className="h-12" value="Interested">
                Interested
              </option>
              <option value="Not Interested">Not Interested</option>
            </select>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="">Administration</label>
            <input
              className="bg-backgroundDark h-12 mt-2 px-3 border-2 border-white rounded"
              type="text"
            />
          </div>
          <input
            className="px-8 py-4 border-2 border-white mt-4 hover:bg-lilacBlue hover:text-blackTextLight"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default IngestionMetadataTest;
