import Card from "./Card";

const Dashboard = () => {
  return (
    <div className="w-[64rem] mx-auto mt-12">
      <h3 className="text-2xl text-blackTextLight dark:text-white font-medium">
        My Dashboard
      </h3>
      {/* <div className="w-[58rem] flex flex-wrap gap-8 justify-center mx-auto"> */}
      <div className="mt-8 grid grid-cols-3 justify-items-start gap-y-8">
        <Card color="lilacBlue" />
        <Card color="lilacBlue" />
        <Card color="lilacBlue" />
        <Card color="salmonRed" />
        <Card color="salmonRed" />
      </div>
    </div>
  );
};

export default Dashboard;
