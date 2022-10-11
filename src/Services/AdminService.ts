import axios from "axios";
import { CompanyModel, CustomerModel } from "../Models/UserModel";
import {
  adminStore,
  fetchCompaniesAction,
  fetchCustomersAction,
} from "../Redux/AdminState";
import appConfig from "../Utils/Config";

class AdminService {
  public async deleteCompany(companyId: number | string) {
    await axios.delete(`${appConfig.companiesUrl}/${companyId}`);
  }
  public async updateCompany(company: CompanyModel): Promise<CompanyModel> {
    const response = await axios.put<CompanyModel>(
      appConfig.companiesUrl,
      company
    );
    const updatedCompany = response.data;
    return updatedCompany;
  }
  public async createCompany(company: CompanyModel): Promise<CompanyModel> {
    const response = await axios.post<CompanyModel>(
      appConfig.companiesUrl,
      company
    );
    const createdCompany = response.data;
    return createdCompany;
  }
  public async fetchCompanies(): Promise<CompanyModel[]> {
    const response = await axios.get<CompanyModel[]>(appConfig.companiesUrl);
    const companies = response.data;
    adminStore.dispatch(fetchCompaniesAction(companies));
    return companies;
  }

  public async fetchOneCompany(companyId: number): Promise<CompanyModel> {
    const response = await axios.get<CompanyModel>(
      appConfig.companiesUrl + `/${companyId}`
    );
    const company = response.data;
    return company;
  }

  public async fetchCustomers(): Promise<CustomerModel[]> {
    let customers = adminStore.getState().customers;
    if (customers.length === 0) {
      const response = await axios.get<CustomerModel[]>(appConfig.customersUrl);
      customers = response.data;
      adminStore.dispatch(fetchCustomersAction(customers));
    }
    return customers;
  }
}

const adminService = new AdminService();

export default adminService;
