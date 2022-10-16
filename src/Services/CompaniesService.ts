import { GridRowId } from "@mui/x-data-grid";
import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/Config";

class CompaniesService {
    deleteCustomer(couponId: GridRowId) {
      throw new Error("Method not implemented.");
    }

    public async fetchCompanyCoupons(): Promise<CouponModel[]> {
        const response = await axios.get<CouponModel[]>(appConfig.companyCouponsUrl);
        const coupons = response.data;
        return coupons;
    }

}

const companiesService = new CompaniesService();

export default companiesService;

