import { useEffect } from "react";
import Card from "./Card";

const Dashboard = (props) => {
  const cards = props.tabs.map((tab) => {
    return (
      <Card
        color={tab.color}
        path={tab.path}
        icon={tab.icon}
        title={tab.name}
        desc={tab.description}
        key={tab.name}
      />
    );
  });

  useEffect(() => {
    const testFetch = async () => {
      // const response = await fetch("http://localhost:8000/people/all_people", {
      const response = await fetch("http://localhost:8000/user/all_users", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "ORIGIN",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        // withCredentials: true,
      });

      if (!response.ok) {
        console.error("error");
        return;
      }
      const data = await response.json();
      console.log("fetched successfuly!", data);
    };
    testFetch();
  });

  return (
    <div className="md:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto mt-6 lg:mt-12">
      <h3 className="text-2xl text-blackTextLight dark:text-white font-medium">
        My Dashboard
      </h3>
      {/* <div className="w-[58rem] flex flex-wrap gap-8 justify-center mx-auto"> */}
      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 justify-items-stretch md:gap-x-12 lg:gap-x-0 gap-y-8">
        {cards}
        {/* <Card
          color="lilacBlue"
          path="/ingestion"
          icon="database"
          title="Data Management"
          desc="Tools for data ingestion, querying, sampling, and editing"
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
