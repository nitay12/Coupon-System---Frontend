import { createStore } from "redux";
import { CustomerModel, CompanyModel } from "../Models/UserModel";

export class AdminState {
  public customers: CustomerModel[] = [];
  public companies: CompanyModel[] = [];
}

export enum AdminActionType {
  FetchCompanies = "FetchCompanies",
  FetchCustomers = "FetchCustomers",
}

export interface AdminAction {
  type: AdminActionType;
  payload: any;
}

export function fetchCompaniesAction(companies: CompanyModel[]): AdminAction {
  return { type: AdminActionType.FetchCompanies, payload: companies };
}
export function fetchCustomersAction(customers: CustomerModel[]): AdminAction {
  return { type: AdminActionType.FetchCompanies, payload: customers };
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
  }

  return newState;
}

export const adminStore = createStore(adminReducer);
