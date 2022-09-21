import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../AuthArea/Login/Login";
import Logout from "../../AuthArea/Logout/Logout";
import CompanyCoupons from "../../CompaniesArea/CompanyCoupons/CompanyCoupons";
import BuyCoupons from "../../CustomersArea/BuyCoupons/BuyCoupons";
import CustomerCoupons from "../../CustomersArea/CustomerCoupons/CustomerCoupons";
import Home from "../../HomeArea/Home/Home";
import PageNotFound from "../PageNotFound/PageNotFound";
import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Home */}
                <Route path="/home" element={<Home />} />

                {/* Customers */}
                <Route path="/customers/my-coupons" element={<CustomerCoupons />} />
                <Route path="/customers/buy-coupons" element={<BuyCoupons />} />

                {/* Companies */}
                <Route path="/companies/company-coupons" element={<CompanyCoupons />} />

                {/* Default route */}
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Page not found route */}
                <Route path="*" element={<PageNotFound />} />

            </Routes>

        </div>
    );
}

export default Routing;
