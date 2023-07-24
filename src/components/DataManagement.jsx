import Card from "./Card";

const DataManagement = (props) => {
  return (
    <div className="sm:w-[560px] lg:w-[650px] xl:w-[900px] 2xl:w-[1050px] mx-auto mt-12">
      <h3 className="text-2xl text-blackTextLight dark:text-white font-medium">
        Data Management
      </h3>
      <div className="mt-8 grid sm:grid-cols-2 xl:grid-cols-3 justify-items-start gap-y-8">
        <Card
          color="lilacBlue"
          path="/data-management/ingestion"
          icon="syringe"
          title="Ingestion"
          // desc={tab.description}
        />
        <Card
          color="lilacBlue"
          path="/data-management/query"
          icon="magnifying-glass"
          title="Query"
          // desc={tab.description}
        />
      </div>
    </div>
  );
};

export default DataManagement;
