import { useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import { authStore } from "../../../Redux/AuthState";
import companiesService from "../../../Services/CompaniesService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./CompanyCoupons.css";

function CompanyCoupons(): JSX.Element {
  const [coupons, setCoupons] = useState<CouponModel[]>([]);

  useEffect(() => {
    const companyId = authStore.getState().user.id;
    companiesService
      .fetchCompanyCoupons(companyId)
      .then((coupons) => setCoupons(coupons))
      .catch((err) => notificationService.error(err));
  }, []);

  return (
    <div className="CompanyCoupons">
      <h2>Company Coupons</h2>

      {coupons.map((c) => (
        <CouponCard key={c.id} coupon={c} />
      ))}
    </div>
  );
}

export default CompanyCoupons;
