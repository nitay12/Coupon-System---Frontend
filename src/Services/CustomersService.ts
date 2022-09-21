import axios from "axios";
import CouponModel from "../Models/CouponModel";
import { buyCouponAction, customersStore, fetchCouponsAction } from "../Redux/CustomersState";
import appConfig from "../Utils/Config";

class CustomersService {

    public async fetchMyCoupons(): Promise<CouponModel[]> {
        let coupons = customersStore.getState().coupons;
        if (coupons.length === 0) {
            const response = await axios.get<CouponModel[]>(appConfig.customersMyCouponsUrl);
            coupons = response.data;
            customersStore.dispatch(fetchCouponsAction(coupons));
        }
        return coupons;
    }

    public async fetchOtherCoupons(): Promise<CouponModel[]> {
        const response = await axios.get<CouponModel[]>(appConfig.customersOtherCouponsUrl);
        const coupons = response.data;
        return coupons;
    }

    public async buyCoupon(couponId: number): Promise<CouponModel> {
        const response = await axios.post<CouponModel>(appConfig.customersBuyCouponUrl + couponId);
        const coupon = response.data;
        customersStore.dispatch(buyCouponAction(coupon));
        return coupon;
    }

}

const customersService = new CustomersService();

export default customersService;