const IngestionStartError = (props) => {
  const closeErrorHandler = () => {
    props.setHasError(false);
  };

  // const display = props.hasError ? 'flex'

  return (
    <div
      className={`w-40 h-24 px-4 py-4 text-white text-sm absolute right-0 md:right-20 xl:right-40 top-10 bg-cardDark ${
        props.hasError ? "flex" : "hidden"
      } items-center`}
    >
      <div
        className="absolute top-[-14px] w-0 h-0 
        border-l-[14px] border-l-transparent
        border-b-[20px] border-b-cardDark
        border-r-[14px] border-r-transparent"
      ></div>
      <button
        onClick={closeErrorHandler}
        className="absolute top-[-12px] right-[-8px] bg-salmonRed h-5 w-5 rounded-full flex justify-center items-center"
      >
        X
      </button>
      <p>{props.errorMessage}</p>
    </div>
  );
};

export default IngestionStartError;
