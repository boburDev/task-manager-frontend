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
    <div className="w-[400px] h-[300px] mt-14 mx-auto">
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
