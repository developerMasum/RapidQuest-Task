import React, { useState, useEffect } from "react";
import axios from "axios";
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
} from "chart.js";

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
  const [interval, setInterval] = useState<string>("monthly");
  const [chartData, setChartData] = useState<CustomerGrowthData[]>([]);

  useEffect(() => {
    fetchGrowthData(interval);
  }, [interval]);

  const fetchGrowthData = async (interval: string) => {
    try {
      const response = await axios.get<{ data: CustomerGrowthData[] }>(
        `http://localhost:5000/api/customers?interval=${interval}`
      );
      setChartData(response.data.data);
    } catch (error) {
      console.error("Error fetching growth data:", error);
    }
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(e.target.value);
  };

  const data = {
    labels: chartData.map((item) => item._id),
    datasets: [
      {
        label: "New Customers",
        data: chartData.map((item) => item.totalNewCustomers),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 10,
        fill: false,
        cubicInterpolationMode: "monotone" as const,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        cubicInterpolationMode: "monotone" as const,
      },
    },
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
