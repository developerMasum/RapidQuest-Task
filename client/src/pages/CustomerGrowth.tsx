import React, { useState } from "react";
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
import { useGetCustomerGrowthOverTimeQuery } from "@/redux/api/dashboardApi";
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

interface CustomerGrowthData {
  _id: string;
  totalNewCustomers: number;
}

const CustomerGrowth: React.FC = () => {
  const [interval, setInterval] = useState<"daily" | "monthly" | "yearly">(
    "monthly"
  );
  const {
    data: chartData = [],
    error,
    isLoading,
  } = useGetCustomerGrowthOverTimeQuery(interval);

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading data!</p>;

  // Ensure chartData is correctly typed and accessed
  const labels = chartData?.data?.map((item: CustomerGrowthData) => item._id);
  const dataValues = chartData?.data?.map(
    (item: CustomerGrowthData) => item.totalNewCustomers
  );

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "New Customers",
        data: dataValues,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 10,
        fill: false,
        cubicInterpolationMode: "monotone",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        cubicInterpolationMode: "monotone",
      },
    },
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value as "daily" | "monthly" | "yearly");
  };

  return (
    <div>
      <h1>Customer Growth Over Time</h1>
      <label htmlFor="interval-select">Select Interval: </label>
      <select
        id="interval-select"
        value={interval}
        onChange={handleIntervalChange}
      >
        <option value="daily">Daily</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomerGrowth;
