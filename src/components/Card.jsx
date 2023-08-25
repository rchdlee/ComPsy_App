// import { ReactComponent as Datacoil } from "../icons/data-coil.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Card = (props) => {
  let backgroundColor;
  let backgroundColorActive;

  if (props.color === "lilacBlue") {
    backgroundColor = "bg-lilacBlue";
    backgroundColorActive = "group-active:bg-lilacBlueActive";
  }
  if (props.color === "salmonRed") {
    backgroundColor = "bg-salmonRed";
    backgroundColorActive = "group-active:bg-salmonRedActive";
  }

  return (
    <div className="group w-full sm:w-60 md:w-64 lg:w-72 xl:w-[264px] 2xl:w-72 h-40 relative select-none">
      <Link to={`${props.path}`}>
        <div className="w-full sm:w-60 md:w-64 lg:w-72 xl:w-[264px] h-40 bg-cardLight dark:bg-cardDark rounded-lg absolute z-20 transition-transform duration-75 group-hover:-translate-x-1 group-hover:-translate-y-1 group-active:-translate-x-0.5 group-active:-translate-y-0.5">
          <div className="p-6">
            {/* <DataCoilComp width="28" height="32" /> */}
            <div className="flex xl:block h-14 xl:h-auto items-center gap-4">
              <FontAwesomeIcon
                icon={props.icon}
                className="text-blackTextLight dark:text-white h-8 "
              />
              <h4 className="text-lg font-bold xl:mt-3 z-50 text-blackTextLight dark:text-white">
                {props.title}
              </h4>
            </div>
            <p className="text-xs mt-5 xl:mt-0.5 text-blackTextLight dark:text-white">
              {props.desc}
            </p>
          </div>
        </div>
        <div
          className={`w-full sm:w-60 md:w-64 lg:w-72 xl:w-[264px] h-40 ${backgroundColor} ${backgroundColorActive} rounded-lg text-white absolute top-1 left-1 z-10`}
        ></div>
      </Link>
    </div>
  );
};

export default Card;
