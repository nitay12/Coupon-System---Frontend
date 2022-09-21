import axios from "axios";
import CouponModel from "../Models/CouponModel";
import appConfig from "../Utils/Config";

class CompaniesService {

    public async fetchCompanyCoupons(companyId: number): Promise<CouponModel[]> {
        const response = await axios.get<CouponModel[]>(appConfig.companyCouponsUrl + companyId);
        const coupons = response.data;
        return coupons;
    }

}

const companiesService = new CompaniesService();

export default companiesService;

