import BarChart from "../charts/BarChart";
import CustomerLocation from "../charts/CustomerLocation";
import ChartWithPointStyling from "../charts/GrowthRate";
import RepeatedCustomerByTime from "../charts/RepetedCustomerByTime";

const Home = () => {
  return (
    <div>
      <RepeatedCustomerByTime />
      <CustomerLocation />
      <ChartWithPointStyling />
      <BarChart />
    </div>
  );
};

export default Home;
