import Card from "./Card";

const Dashboard = (props) => {
  const cards = props.tabs.map((tab) => {
    return (
      <Card
        color={tab.color}
        path={tab.path}
        icon={tab.icon}
        title={tab.name}
        desc="Tools for data ingestion, querying, sampling, and editing"
      />
    );
  });

  return (
    <div className="w-[64rem] mx-auto mt-12">
      <h3 className="text-2xl text-blackTextLight dark:text-white font-medium">
        My Dashboard
      </h3>
      {/* <div className="w-[58rem] flex flex-wrap gap-8 justify-center mx-auto"> */}
      <div className="mt-8 grid grid-cols-3 justify-items-start gap-y-8">
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
