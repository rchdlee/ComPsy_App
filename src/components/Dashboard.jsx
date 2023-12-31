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

  return (
    <div className="md:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto mt-6 lg:mt-12">
      <h3 className="text-2xl text-blackTextLight dark:text-white font-medium">
        My Dashboard
      </h3>
      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 justify-items-stretch md:gap-x-12 lg:gap-x-0 gap-y-8">
        {cards}
      </div>
    </div>
  );
};

export default Dashboard;
