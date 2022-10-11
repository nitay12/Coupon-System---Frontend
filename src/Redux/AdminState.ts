import { createStore } from "redux";
import { CustomerModel, CompanyModel } from "../Models/UserModel";

export class AdminState {
  public customers: CustomerModel[] = [];
  public companies: CompanyModel[] = [];
  public selectedCompany: CompanyModel;
  public selectedCustomer: CustomerModel;
}

export enum AdminActionType {
  FetchCompanies = "FetchCompanies",
  FetchCustomers = "FetchCustomers",
  SelectCompany = "SelectCompany",
  SelectCustomer = "SelectCustomer",
}

export interface AdminAction {
  type: AdminActionType;
  payload: any;
}

export function fetchCompaniesAction(companies: CompanyModel[]): AdminAction {
  return { type: AdminActionType.FetchCompanies, payload: companies };
}
export function fetchCustomersAction(customers: CustomerModel[]): AdminAction {
  return { type: AdminActionType.FetchCustomers, payload: customers };
}
export function selectCustomerAction(customer: CustomerModel): AdminAction {
  return { type: AdminActionType.SelectCustomer, payload: customer };
}
export function selectCompanyAction(company: CompanyModel): AdminAction {
  return { type: AdminActionType.SelectCompany, payload: company };
}

export function adminReducer(
  currentState = new AdminState(),
  action: AdminAction
): AdminState {
  const newState = { ...currentState };

  switch (action.type) {
    case AdminActionType.FetchCompanies:
      newState.companies = action.payload;
      break;

    case AdminActionType.FetchCustomers:
      newState.customers = action.payload;
      break;
    case AdminActionType.SelectCompany:
      newState.selectedCompany = action.payload;
      break;
    case AdminActionType.SelectCustomer:
      newState.selectedCustomer = action.payload;
      break;
  }

  return newState;
}

export const adminStore = createStore(adminReducer);
