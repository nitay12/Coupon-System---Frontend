import { GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/Config";

class CompaniesService {
    public async deleteCoupon(couponId: GridRowId) {
      await axios.delete(`${appConfig.companyCouponsUrl}${couponId}`)
    }

    public async fetchCompanyCoupons(): Promise<CouponModel[]> {
        const response = await axios.get<CouponModel[]>(appConfig.companyCouponsUrl);
        const coupons = response.data;
        return coupons;
    }

}

const companiesService = new CompaniesService();

export default companiesService;

