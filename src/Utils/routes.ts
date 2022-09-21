import Route from '../Models/Route'

export const adminRoutes:Route[] = [
    { title: "See Customers", path: "/customers" },
    {
      title: "Create Customer",
      path: "/create-customer",
    },
    {
      title: "Update Customer",
      path: "/update-customer",
    },
    {
      title: "Delete Customer",
      path: "/delete-customer",
    },
    {
      title: "See Companies",
      path: "/companies",
    },
    {
      title:"Create Company",
      path: "/create-company",
    },
    {
      title:"Update Company",
      path: "/update-company",
    },
    {
      title:"Delete Company",
      path: "/delete-company",
    },
  ]