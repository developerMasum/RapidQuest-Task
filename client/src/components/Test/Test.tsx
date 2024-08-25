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
    <div>
      <h1>Sales Data</h1>
      <select
        value={view}
        onChange={(e) =>
          setView(
            e.target.value as "daily" | "monthly" | "quarterly" | "yearly"
          )
        }
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>

      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesOverView;
