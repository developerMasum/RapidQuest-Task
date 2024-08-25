/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetSellsOverTimeQuery } from "@/redux/api/dashboardApi";

import Loader from "@/lib/Loader";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesOverView: React.FC = () => {
  const [view, setView] = useState<
    "daily" | "monthly" | "quarterly" | "yearly"
  >("daily");

  // Fetch data based on the selected view
  const { data: sellsData, error, isLoading } = useGetSellsOverTimeQuery(view);
  //   console.log(sellsData);

  // Prepare data for Chart.js
  const chartData = {
    labels: sellsData?.data?.map((item: any) => item._id) || [],
    datasets: [
      {
        label: "Total Sales",
        data: sellsData?.data?.map((item: any) => item.totalSales) || [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Count",
        data: sellsData?.data?.map((item: any) => item.count) || [],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  return (
    <div className="">
      <p className="text-2xl font-semibold text-center text-gray-700">
        Total Sales Over Time
      </p>
      <div className="flex justify-start">
        <select
          value={view}
          onChange={(e) =>
            setView(
              e.target.value as "daily" | "monthly" | "quarterly" | "yearly"
            )
          }
          className="w-48 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesOverView;
