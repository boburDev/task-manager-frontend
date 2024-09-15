import { useFetchData } from "@/hooks";
import { useEffect, useState } from "react";
import PieChart from "@/components/chart/PieChart";

const Home = () => {
  const { data, isLoading } = useFetchData("task/pie-chart");
  const { data: userTask, isLoading: userTaskLoading } =
    useFetchData("task/user-tasks");
  console.log(userTask);

  return (
    <div>
      <PieChart data={data} />
    </div>
  );
};

export default Home;
