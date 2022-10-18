class Config { }

class DevelopmentConfig extends Config {
    private baseUrl: string = "http://localhost:8080"
    public loginUrl = this.baseUrl + "/auth/login";
    public adminCompaniesUrl = this.baseUrl+"/admin/companies"
    public adminCustomersUrl = this.baseUrl+"/admin/customers"
    public customersMyCouponsUrl = this.baseUrl+"/customer/coupons"
    public customersAllCouponsUrl = this.baseUrl+"/coupons/all"
    public customersBuyCouponUrl = this.baseUrl+"/customer/purchase/";
    public companyCouponsUrl = this.baseUrl + "/company/coupons/";

}

class ProductionConfig extends Config {
    private baseUrl: string = "http://localhost:8080"
    public loginUrl = this.baseUrl + "/auth/login";
    public adminCompaniesUrl = this.baseUrl+"/admin/companies"
    public adminCustomersUrl = this.baseUrl+"/admin/customers"
    public customersMyCouponsUrl = this.baseUrl+"/customer/coupons"
    public customersAllCouponsUrl = "http://localhost:3001/api/customers/other-coupons/";
    public customersBuyCouponUrl = "http://localhost:3001/api/customers/buy-coupon/";
    public companyCouponsUrl = this.baseUrl + "/company/coupons/";
}

const appConfig = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default appConfig;
