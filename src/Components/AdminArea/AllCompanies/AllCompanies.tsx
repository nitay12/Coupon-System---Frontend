import axios from "axios";
import { useEffect, useState } from "react";
import { CompanyModel } from "../../../Models/UserModel";
import adminService from "../../../Services/AdminService";
import { CompaniesTable } from "../CompaniesTable";
import notificationService from "../../../Services/NotificationService";


const AllCompanies = (): JSX.Element => {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  useEffect(() => {
    console.log(axios.defaults.headers);
    adminService
      .fetchCompanies()
      .then((companies) => {
        setCompanies(companies);
      })
      .catch((err) => notificationService.error(err));
  }, []);

  return (
    <>
      <h1>All Companies</h1>
      <CompaniesTable companies={companies} />
    </>
  );
};

export default AllCompanies;
