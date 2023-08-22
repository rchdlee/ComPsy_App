import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorModal = (props) => {
  const containerStyles = props.hasError ? "translate-y-24" : "";

  const closeErrorHandler = () => {
    props.setHasError(false);
  };

  return (
    <div
      className={`border-2 border-salmonRed rounded dark:bg-cardDark text-blackTextLight dark:text-white w-80 h-20 px-4 absolute ${containerStyles} -top-20 left-[calc(50%-24px)] flex items-center justify-between
      transition-transform`}
    >
      <div className="flex items-center gap-3">
        <FontAwesomeIcon
          // icon={["far", "circle-xmark"]}
          icon="triangle-exclamation"
          size="xl"
          className="text-salmonRed"
        />
        <p className="text-base px-2">{props.errorMessage}</p>
      </div>
      <button onClick={closeErrorHandler}>
        {/* <div className="border-2 border-blackTextWhite dark:border-white rounded px-1"> */}
        <FontAwesomeIcon icon="xmark" />
        {/* </div> */}
      </button>
    </div>
  );
};

export default ErrorModal;
