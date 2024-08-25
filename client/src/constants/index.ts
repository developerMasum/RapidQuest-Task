import assets from "@/assets";

export const App_Name = "RapidQuest";
interface SideMenuItem {
  title: string;
  path: string;
  image: string; // URL to the image
  show?: boolean; // Optional property to control visibility
}

const sideMenuItems: SideMenuItem[] = [
  {
    title: "Home",
    path: "/",
    image: assets.images.home,
    show: true,
  },
  {
    title: "Sales Over Time",
    path: "/sales_over_time",
    image: assets.images.saleRate,
    show: true,
  },

  {
    title: "Sales Growth Rate",
    path: "/sales_growth_rate",
    image: assets.images.salesGrowth,
    show: true,
  },
  {
    title: "Customer Growth",
    path: "/customers_growth",
    image: assets.images.customerGrowth,
    show: true,
  },
  {
    title: "Repeat Customers",
    path: "/repeat_customers",
    image: assets.images.repeatCustomer,
    show: true, // This item will be hidden
  },
  {
    title: "Customer Geography",
    path: "/customer_geography",
    image: assets.images.customerMap,
    show: true,
  },
  {
    title: "Cohort Lifetime Value",
    path: "/cohort_lifetime_value",
    image: assets.images.customerLifeTime,
    show: true,
  },
];

export default sideMenuItems;
