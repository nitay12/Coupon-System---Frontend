import axios from "axios";
import { useEffect, useState } from "react";
import { CustomerModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import { CustomersTable } from "./CustomersTable";
import notificationService from "../../../Services/NotificationService";

const AllCustomers = (): JSX.Element => {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  useEffect(() => {
    adminService
      .fetchCustomers()
      .then((customers) => {
        setCustomers(customers);
      })
      .catch((err) => notificationService.error(err));
  }, []);

  return (
    <>
      <h1>All Customers</h1>
      <CustomersTable customers={customers} />
    </>
  );
};

export default AllCustomers;
