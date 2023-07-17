const LoadScreen = (props) => {
  return (
    <div className="flex items-center mt-24 flex-col gap-8">
      <div
        className="inline-block w-20 h-20 after:content-[' '] after:block after:w-16 after:h-16 after:m-2 after:border-[6px] 
    after:border-t-blackTextLight after:border-l-white after:border-b-blackTextLight after:border-r-white
    dark:after:border-t-white dark:after:border-l-backgroundDark dark:after:border-b-white dark:after:border-r-backgroundDark
    after:animate-spin
    after:rounded-full"
      ></div>
      <p className="text-blackTextLight dark:text-white">{props.message}</p>
    </div>
  );
};

export default LoadScreen;
