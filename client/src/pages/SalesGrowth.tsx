/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { useGetSellsGrowthRateQuery } from "@/redux/api/dashboardApi";
import Loader from "@/lib/Loader";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SellsGrowthRate: React.FC = () => {
  const { data: chartData, error, isLoading } = useGetSellsGrowthRateQuery({});

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  // Ensure data is correctly structured
  const labels = chartData?.data?.map((item: any) => item.month) || [];
  const growthRates =
    chartData?.data?.map((item: any) => item.growthRate || 0) || [];

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "Growth Rate",
        data: growthRates,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        pointStyle: "rectRounded",
        pointRadius: 10,
        pointHoverRadius: 15,
        fill: false,
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
        position: "left",
      },
      "y-axis-1": {
        beginAtZero: true,
        position: "right",
      },
    },
    elements: {
      line: {
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
    },
  };

  return (
    <div>
      <h1>Sales Growth Chart with Interpolation Modes</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default SellsGrowthRate;
