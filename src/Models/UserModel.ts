import Role from "./Role";

export abstract class BaseUserModel {
	public id: number;
    public email: string;
    public role: Role;
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
