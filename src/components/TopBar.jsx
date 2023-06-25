import Switch from "react-switch";

const TopBar = (props) => {
  const handleDarkModeSwitch = () => {
    props.setIsDarkMode((prevState) => !prevState);
  };

  return (
    <div className="text-white flex justify-between mt-2">
      <div className="text-sm">
        <img src="" alt="" />
        <p>Home/Path/Path</p>
      </div>
      <div className="flex gap-x-8 items-center">
        <div className="flex items-center gap-x-3 rounded-full px-4 py-2 bg-cardDark">
          <div className="bg-white p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
              className="fill-blackTextLight"
            >
              <path
                // fill="#F7F7F7"
                d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm130.7 57.9c-4.2-13.6 7.1-25.9 21.3-25.9H364.5c14.2 0 25.5 12.4 21.3 25.9C369 368.4 318.2 408 258.2 408s-110.8-39.6-127.5-94.1zM144.4 192a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
              />
            </svg>
          </div>
          <p>Birkan Tunc</p>
        </div>
        <div>
          <label>
            {/* <span>Switch with default style</span> */}
            <Switch
              onChange={handleDarkModeSwitch}
              checked={props.isDarkMode}
              uncheckedIcon={false}
              checkedIcon={false}
              // onColor="#4A4A4A"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
