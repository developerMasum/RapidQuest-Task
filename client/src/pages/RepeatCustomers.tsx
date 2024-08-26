/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import axios from "axios";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TCustomerData = {
  _id: string;
  repeatCustomersCount: number;
  customerNames: string[];
}[];

const RepeatCustomers: React.FC = () => {
  const [data, setData] = useState<TCustomerData>([]);
  const [view, setView] = useState<
    "daily" | "monthly" | "quarterly" | "yearly"
  >("monthly");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rapid-quist-task.vercel.app/api/customers/repeat",
          {
            params: { interval: view },
          }
        );
        // console.log(response);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [view]);

  const chartData = {
    labels: data.map((item) => `${item._id}`),
    datasets: [
      {
        label: "Repeat Customers",
        data: data.map((item) => item.repeatCustomersCount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            const customerNames = data[index].customerNames.join(", ");
            return `${context.dataset.label}: ${context.raw} (Customers: ${customerNames})`;
          },
        },
      },
    },
  };

  return (
    <div>
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

export default RepeatCustomers;
