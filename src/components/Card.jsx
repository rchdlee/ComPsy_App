// import { ReactComponent as Datacoil } from "../icons/data-coil.svg";

import DataCoilComp from "../icons/DataCoilComp";

const Card = (props) => {
  let backgroundColor;
  let backgroundColorActive;

  // console.log(<Datacoil />);

  if (props.color === "lilacBlue") {
    backgroundColor = "bg-lilacBlue";
    backgroundColorActive = "group-active:bg-lilacBlueActive";
  }
  if (props.color === "salmonRed") {
    backgroundColor = "bg-salmonRed";
    backgroundColorActive = "group-active:bg-salmonRedActive";
  }

  return (
    <div className="group w-72 h-40 relative select-none">
      <div className="w-72 h-40 bg-cardLight dark:bg-cardDark rounded-lg absolute z-20 transition-transform duration-75 group-hover:-translate-x-1 group-hover:-translate-y-1 group-active:-translate-x-0.5 group-active:-translate-y-0.5">
        <div className="p-6">
          <DataCoilComp width="28" height="32" />
          <h4 className="text-lg font-bold mt-3 z-50 text-blackTextLight dark:text-white">
            Data Management
          </h4>
          <p className="text-xs mt-0.5 text-blackTextLight dark:text-white">
            Tools for data ingestion, querying, sampling, and editing
          </p>
        </div>
      </div>
      <div
        className={`w-72 h-40 ${backgroundColor} ${backgroundColorActive} rounded-lg text-white absolute top-1 left-1 z-10`}
      ></div>
    </div>
    // <div className="relative">
    //   <div className="w-72 h-40 bg-white rounded-lg text-white block z-30">
    //     <div className="p-6">
    //       <Datacoil />
    //       <h4 className="text-lg font-bold mt-3 z-50">Data Management</h4>
    //       <p className="text-xs mt-0.5">
    //         Tools for data ingestion, querying, sampling, and editing
    //       </p>
    //     </div>
    //   </div>
    //   <div className="w-72 h-40 bg-lilacBlue rounded-lg text-white absolute top-1 left-1 z-10"></div>
    // </div>
  );
};

export default Card;
