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
  const [interval, setInterval] = useState<
    "daily" | "monthly" | "quarterly" | "yearly"
  >("monthly");
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
    setInterval(e.target.value as "daily" | "monthly" | "quarterly" | "yearly");
  };

  return (
    <div>
      <p className="text-2xl font-semibold text-center text-gray-700">
        Customer Growth Over Time
      </p>
      <div className="flex justify-start">
        <select
          value={interval}
          onChange={handleIntervalChange}
          className="w-48 p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
        >
          <option value="daily">Daily</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default CustomerGrowth;
