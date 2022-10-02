import UserType from "./UserType";

export abstract class BaseUserModel {
	public id: number;
    public email: string;
    public userType: UserType;
    public password?: string;
}

export class CustomerModel extends BaseUserModel {
    public firstName: string;
    public lastName: string;
}

export class CompanyModel extends BaseUserModel {
    public name: string;
}

export class AdminModel extends BaseUserModel {
}
