import axios from "axios";
import { CompanyModel, CustomerModel } from "../Models/UserModel";
import {
  adminStore,
  fetchCompaniesAction,
  fetchCustomersAction,
} from "../Redux/AdminState";
import appConfig from "../Utils/Config";

class AdminService {
  public async createCompany(company: CompanyModel): Promise<CompanyModel> {
    const response = await axios.post<CompanyModel>(appConfig.companiesUrl, company)
    const createdCompany = response.data;
    return createdCompany
  }
  public async fetchCompanies(): Promise<CompanyModel[]> {
    let companies = adminStore.getState().companies;
    if (companies.length === 0) {
      const response = await axios.get<CompanyModel[]>(
        appConfig.companiesUrl
      );
      companies = response.data;
      adminStore.dispatch(fetchCompaniesAction(companies));
    }
    return companies;
  }

  public async fetchCustomers(): Promise<CustomerModel[]> {
    let customers = adminStore.getState().customers;
    if (customers.length === 0) {
      const response = await axios.get<CustomerModel[]>(
        appConfig.customersUrl
      );
      customers = response.data;
      adminStore.dispatch(fetchCustomersAction(customers));
    }
    return customers;
  }
}

const adminService = new AdminService();

export default adminService;
