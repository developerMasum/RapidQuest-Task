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

const SellsGrowthRate: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/orders/growth"
        );
        setChartData(response.data.data); // Assuming `data.data` holds the array of growth data
      } catch (error) {
        console.error("Error fetching growth data:", error);
      }
    };

    fetchGrowthData();
  }, []);

  const data = {
    labels: chartData.map((item) => item.month),
    datasets: [
      // {
      //   label: "Total Sales",
      //   data: chartData.map((item) => item.totalSales),
      //   borderColor: "rgba(75, 192, 192, 1)", // teal color
      //   backgroundColor: "rgba(75, 192, 192, 0.2)", // transparent teal color
      //   pointStyle: "rectRounded",
      //   pointRadius: 10,
      //   pointHoverRadius: 15,
      //   fill: false, // Ensure no fill for the line chart
      // },
      {
        label: "Growth Rate",
        data: chartData.map((item) => item.growthRate || 0), // Handle null values
        borderColor: "rgba(255, 99, 132, 1)", // red color
        backgroundColor: "rgba(255, 99, 132, 0.2)", // transparent red color
        pointStyle: "rectRounded",
        pointRadius: 10,
        pointHoverRadius: 15,
        fill: false, // Ensure no fill for the line chart
        yAxisID: "y-axis-2",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        position: "left" as const, // Explicitly typing the position as 'left'
      },
      "y-axis-2": {
        beginAtZero: true,
        position: "right" as const, // Explicitly typing the position as 'right'
      },
    },
    elements: {
      line: {
        tension: 0.4, // Adds a slight curve to the line
        cubicInterpolationMode: "monotone" as const, // Ensures no overshoot and smooth interpolation
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
