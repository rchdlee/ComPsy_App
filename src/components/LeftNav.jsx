import Pencil from "../icons/Pencil";
import SyringeSmall from "../icons/SyringeSmall";

const LeftNav = () => {
  return (
    // <div className="bg-white dark:bg-sidebarDark xl:w-60 xl:h-screen text-white">
    <div className="bg-white dark:bg-sidebarDark w-60 h-screen text-white">
      <div className=" px-6">
        <h1 className="text-5xl font-bold pt-6 text-center">ComPsy</h1>
        <div className="mt-5 ">
          <div className="mt-4">
            <div className="flex items-center gap-x-4 text-base font-semibold">
              <Pencil />
              <p className="text-lg">Main</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-x-4 text-base font-semibold">
              <Pencil />
              <p className="text-lg">Main</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-x-4 text-base font-semibold">
              <Pencil />
              <p className="text-lg">Main</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
            <div className="flex items-center gap-x-3 ml-6 mt-2">
              <SyringeSmall />
              <p className="text-sm">Section</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
