import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
const PieChart = (data) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Completed", "Not completed"],
        datasets: [
          {
            data: [
              data?.data?.[0]?.totalCompletedTasks,
              data?.data?.[0]?.totalNotCompletedTasks,
            ],
            backgroundColor: ["rgb(255, 205, 86)", "rgb(255, 99, 132)"],
          },
        ],
      },
    });
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);
  return (
    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[300px] flex text-blue-gray-800 font-medium flex-col items-center mt-14 mx-auto mb-16">
      <h4 className="text-[18px] text-center">
        All: {data?.data?.[0]?.totalTasks}
      </h4>
      <canvas
        ref={chartRef}
        style={{ width: "50px", height: "50px" }}
        width={100}
        height={100}
      />
    </div>
  );
};

export default PieChart;
