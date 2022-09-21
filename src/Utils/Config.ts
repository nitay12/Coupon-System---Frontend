class Config { }

class DevelopmentConfig extends Config {
    public loginUrl = "http://localhost:8080/auth/login";
    public customersMyCouponsUrl = "http://localhost:3001/api/customers/my-coupons/";
    public customersOtherCouponsUrl = "http://localhost:3001/api/customers/other-coupons/";
    public customersBuyCouponUrl = "http://localhost:3001/api/customers/buy-coupon/";
    public companyCouponsUrl = "http://localhost:3001/api/companies/company-coupons/";
}

class ProductionConfig extends Config {
    public loginUrl = "http://localhost:3001/api/auth/login/";
    public customersMyCouponsUrl = "http://localhost:3001/api/customers/my-coupons/";
    public customersOtherCouponsUrl = "http://localhost:3001/api/customers/other-coupons/";
    public customersBuyCouponUrl = "http://localhost:3001/api/customers/buy-coupon/";
    public companyCouponsUrl = "http://localhost:3001/api/companies/company-coupons/";
}

const appConfig = process.env.NODE_ENV === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default appConfig;
