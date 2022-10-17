import axios from "axios";
import { CompanyModel, CustomerModel } from "../Models/UserModel";
import {
  adminStore,
  fetchCompaniesAction,
  fetchCustomersAction,
} from "../Redux/AdminState";
import appConfig from "../Utils/Config";

class AdminService {
  public async createCustomer(customer: CustomerModel): Promise<CustomerModel> {
    const response = await axios.post<CustomerModel>(
      appConfig.adminCustomersUrl,
      customer
    );
    const createdCustomer = response.data;
    return createdCustomer
  }
  public async fetchOneCustomer(customerId: number) {
    const response = await axios.get<CustomerModel>(
      appConfig.adminCustomersUrl + `/${customerId}`
    );
    const customer = response.data;
    return customer;
  }
  public async deleteCustomer(customerId: number | string) {
    await axios.delete(`${appConfig.adminCustomersUrl}/${customerId}`);
  }
  public async updateCustomer(customer: CustomerModel): Promise<CustomerModel> {
    const response = await axios.put<CustomerModel>(
      appConfig.adminCustomersUrl,
      customer
    );
    const updatedCompany = response.data;
    return updatedCompany;
  }

  public async deleteCompany(companyId: number | string) {
    await axios.delete(`${appConfig.adminCompaniesUrl}/${companyId}`);
  }
  public async updateCompany(company: CompanyModel): Promise<CompanyModel> {
    const response = await axios.put<CompanyModel>(
      appConfig.adminCompaniesUrl,
      company
    );
    const updatedCompany = response.data;
    return updatedCompany;
  }
  public async createCompany(company: CompanyModel): Promise<CompanyModel> {
    const response = await axios.post<CompanyModel>(
      appConfig.adminCompaniesUrl,
      company
    );
    const createdCompany = response.data;
    return createdCompany;
  }
  public async fetchCompanies(): Promise<CompanyModel[]> {
    const response = await axios.get<CompanyModel[]>(appConfig.adminCompaniesUrl);
    const companies = response.data;
    adminStore.dispatch(fetchCompaniesAction(companies));
    return companies;
  }

  public async fetchOneCompany(companyId: number): Promise<CompanyModel> {
    const response = await axios.get<CompanyModel>(
      appConfig.adminCompaniesUrl + `/${companyId}`
    );
    const company = response.data;
    return company;
  }

  public async fetchCustomers(): Promise<CustomerModel[]> {
    let customers = adminStore.getState().customers;
    const response = await axios.get<CustomerModel[]>(appConfig.adminCustomersUrl);
    customers = response.data;
    adminStore.dispatch(fetchCustomersAction(customers));
    return customers;
  }
}

const adminService = new AdminService();

export default adminService;
