import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { useGetCorotLifeTimeValuesQuery } from "@/redux/api/dashboardApi";
import Loader from "@/lib/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CLVData {
  _id: string;
  cohort: string;
  customerCount: number;
  totalCLV: number;
}

const CohortLifetimeValue: React.FC = () => {
  const {
    data: clvData,
    error,
    isLoading,
  } = useGetCorotLifeTimeValuesQuery({});
  console.log(clvData);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Error loading data. Please try again later.
      </div>
    );
  }

  const labels: string[] = clvData?.data.map((item: CLVData) => item._id);
  const customerCounts: number[] = clvData?.data.map(
    (item: CLVData) => item.customerCount
  );
  const totalLifetimeValues: number[] = clvData.data.map(
    (item: CLVData) => item.totalCLV
  );

  const data: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Customer Count",
        data: customerCounts,
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        yAxisID: "y1",
      },
      {
        label: "Total Lifetime Value",
        data: totalLifetimeValues,
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        yAxisID: "y2",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y1: {
        type: "linear",
        position: "left",
        beginAtZero: true,
        title: {
          display: true,
          text: "Customer Count",
          font: {
            size: 14,
          },
        },
      },
      y2: {
        type: "linear",
        position: "right",
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Lifetime Value ($)",
          font: {
            size: 14,
          },
        },

        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Customer Lifetime Value by Cohorts",
        font: {
          size: 18,
        },
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const value = context.raw || 0;
            if (label === "Total Lifetime Value") {
              return `${label}: $${value.toLocaleString()}`;
            }
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
      legend: {
        position: "top",
        labels: {
          padding: 20,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div className="w-full lg:w-[80%] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[500px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CohortLifetimeValue;
