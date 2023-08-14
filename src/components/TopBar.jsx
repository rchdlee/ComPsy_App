import { Link, useLocation } from "react-router-dom";
import Switch from "react-switch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TopBar = (props) => {
  const location = useLocation();
  // console.log(location, "😫");
  const path = location.pathname;
  const pathArray = path
    .split("/")
    .splice(1)
    .map((path) => {
      return "/" + path;
    });
  const pathFormatted = path
    .split("/")
    .splice(1)
    .map((path) =>
      path
        .replace(/-/g, " ")
        .split(" ")
        .map((string) => string.charAt(0).toUpperCase() + string.substring(1))
        .join(" ")
    );
  // pathFormatted.shift();

  const pathDepth = pathFormatted.length;
  console.log(path, pathArray, pathFormatted, pathDepth);

  const NavPath =
    path !== "/" &&
    pathFormatted.map((page, index) => {
      let pathLink = "";
      for (let i = 0; i < index + 1; i++) {
        pathLink += pathArray[i];
      }

      return (
        <div className="flex items-center gap-2" key={page}>
          <p>/</p>
          <Link to={pathLink}>
            <p className="hover:underline underline-offset-2">{page}</p>
          </Link>
        </div>
      );
    });

  const handleDarkModeSwitch = () => {
    props.setIsDarkMode((prevState) => {
      localStorage.setItem("darkMode", !prevState);
      return !prevState;
    });
  };

  return (
    <div className="md:w-[650px] lg:w-[650px] xl:w-[915px] 2xl:w-[1050px] flex justify-between mx-auto mt-2">
      <div className="text-sm text-darkTextLight dark:text-white flex items-center gap-2">
        <Link to="/">
          <div className="flex items-center gap-2 hover:underline underline-offset-2">
            <FontAwesomeIcon icon="house" />
            <p>Home</p>
          </div>
        </Link>
        {NavPath}
      </div>
      <div className="flex gap-x-8 items-center">
        <div className="hidden sm:flex items-center gap-x-3 rounded-full px-4 py-2 bg-cardLight dark:bg-cardDark">
          <div className="bg-white p-1 rounded-full w-7 h-7 flex justify-center items-center">
            <FontAwesomeIcon icon={["far", "face-smile"]} className="h-5 " />
          </div>
          <p className="text-darkTextLight dark:text-white text-sm xl:text-base">
            Birkan Tunc
          </p>
        </div>
        {/* <div> */}
        {/* <label> */}
        {/* <span>Switch with default style</span> */}
        <Switch
          onChange={handleDarkModeSwitch}
          checked={props.isDarkMode}
          height={32}
          width={64}
          activeBoxShadow="0 0 2px 3px #5d5d5d"
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
