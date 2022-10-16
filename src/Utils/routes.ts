import Route from "../Models/Route";

export const adminRoutes: Route[] = [
  { title: "Customers Panel", 
    path: "/customers" },
  {
    title: "Create Customer",
    path: "/create-customer",
  },
  {
    title: "Companies Panel",
    path: "/companies",
  },
  {
    title: "Create Company",
    path: "/create-company",
  }
];

export const companyRoutes: Route[] = [
  { title: "Coupons Panel", 
    path: "/companies/company-coupons" },
  {
    title: "Create Coupon",
    path: "/create-coupon",
  }
];
