import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { buyCouponAction, customersStore, fetchCouponsAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";

class CustomersService {
    public async fetchAllCoupons() {
        const response = await axios.get<CouponModel[]>(appConfig.customersAllCouponsUrl);
        const coupons = response.data;
        return coupons;
    }
    public async fetchCustomerCoupons() {
        const response = await axios.get<CouponModel[]>(appConfig.customersMyCouponsUrl);
        const coupons = response.data;
        return coupons;
    }

    public async buyCoupon(couponId: number|string): Promise<CouponModel> {
        const response = await axios.put<CouponModel>(appConfig.customersBuyCouponUrl + couponId);
        const coupon = response.data;
        customersStore.dispatch(buyCouponAction(coupon));
        return coupon;
    }

}

const customersService = new CustomersService();

export default customersService;