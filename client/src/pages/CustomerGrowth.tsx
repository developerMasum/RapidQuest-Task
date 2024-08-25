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

// Define the type for the customer growth data
interface CustomerGrowthData {
  _id: string; // Assuming `_id` is a string representing the date or period
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
    labels: chartData.map((item) => item._id), // Assuming `_id` represents the label (e.g., month, day, etc.)
    datasets: [
      {
        label: "New Customers",
        data: chartData.map((item) => item.totalNewCustomers),
        borderColor: "rgba(255, 99, 132, 1)", // red color
        backgroundColor: "rgba(255, 99, 132, 0.2)", // transparent red color
        cubicInterpolationMode: "monotone",
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 10,
        fill: false,
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
        tension: 0.4, // Adds a slight curve to the line
        cubicInterpolationMode: "monotone", // Ensures no overshoot and smooth interpolation
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
