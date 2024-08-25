import Home from "@/components/home/Home";
import HomeLayout from "@/components/layout/HomeLayout";
import NotFound from "@/components/shared/NotFound/NotFound";
import CohortLifetimeValue from "@/pages/CohortLifetimeValue";
import CustomerGeography from "@/pages/CustomerGeography";
import CustomerGrowth from "@/pages/CustomerGrowth";
import RepeatCustomers from "@/pages/RepeatCustomers";
import SellsGrowthRate from "@/pages/SalesGrowth";

import SalesOverView from "@/pages/SalesOverView";

import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "sales_over_time",
        element: <SalesOverView />,
      },

      {
        path: "sales_growth_rate",
        element: <SellsGrowthRate />,
      },
      {
        path: "repeat_customers",
        element: <RepeatCustomers />,
      },
      {
        path: "customers_growth",
        element: <CustomerGrowth />,
      },
      {
        path: "customer_geography",
        element: <CustomerGeography />,
      },
      {
        path: "cohort_lifetime_value",
        element: <CohortLifetimeValue />,
      },
    ],
  },
]);

export default router;
