import { useLocation } from "react-router-dom";
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopBar = (props) => {
  const location = useLocation();
  // console.log(location, "😫");
  const path = location.pathname;
  const pathFormatted = path.slice(1);

  const handleDarkModeSwitch = () => {
    props.setIsDarkMode((prevState) => !prevState);
  };

  return (
    <div className=" flex justify-between mt-2">
      <div className="text-sm text-darkTextLight dark:text-white">
        <img src="" alt="" />
        <p>{`Home / ${pathFormatted}`}</p>
      </div>
      <div className="flex gap-x-8 items-center">
        <div className="flex items-center gap-x-3 rounded-full px-4 py-2 bg-cardLight dark:bg-cardDark">
          <div className="bg-white p-1 rounded-full w-7 h-7 flex justify-center items-center">
            <FontAwesomeIcon icon={["far", "face-smile"]} className="h-5 " />
          </div>
          <p className="text-darkTextLight dark:text-white">Birkan Tunc</p>
        </div>
        {/* <div> */}
        {/* <label> */}
        {/* <span>Switch with default style</span> */}
        <Switch
          onChange={handleDarkModeSwitch}
          checked={props.isDarkMode}
          height={32}
          width={64}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#a9daf0"
          onHandleColor="#25b6f4"
          offColor="#f2e5ae"
          offHandleColor="#f4ca25"
          checkedHandleIcon={
            <div className="flex justify-center items-center h-full text-white">
              <FontAwesomeIcon icon="moon" />
            </div>
          }
          uncheckedHandleIcon={
            <div className="flex justify-center items-center h-full text-blackTextLight">
              <FontAwesomeIcon icon="sun" />
            </div>
          }
        />
        {/* </label> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default TopBar;
