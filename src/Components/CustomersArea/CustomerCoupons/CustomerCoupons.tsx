import { SyntheticEvent, useEffect, useState } from "react";
import CouponModel from "../../../Models/CouponModel";
import customersService from "../../../Services/CustomersService";
import notificationService from "../../../Services/NotificationService";
import CouponCard from "../../SharedArea/CouponCard/CouponCard";
import "./CustomerCoupons.css";

// My Coupons

function CustomerCoupons(): JSX.Element {

    const [originalCoupons, setOriginalCoupons] = useState<CouponModel[]>([]);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);

    useEffect(() => {
        customersService.fetchMyCoupons()
            .then(coupons => {
                setOriginalCoupons([...coupons]);
                setCoupons([...coupons]);
            })
            .catch(err => notificationService.error(err));
    }, []);

    function filterByPrice(args: SyntheticEvent) { // SyntheticEvent = wrapper for event arguments
        const input = args.target as HTMLInputElement;
        const maxPrice = +input.value;
        if (input.value === "") {
            setCoupons(originalCoupons);
        }
        else {
            const filteredCoupons = originalCoupons.filter(c => c.price <= maxPrice);
            setCoupons(filteredCoupons);
        }
    }

    function filterByCategory(args: SyntheticEvent) {
        const select = args.target as HTMLSelectElement;
        const category = select.value;
        const filteredCoupons = originalCoupons.filter(c => c.category === category);
        setCoupons(filteredCoupons);
    }

    return (
        <div className="CustomerCoupons">

            <label>Max Price: </label>
            <input type="number" onChange={filterByPrice} />

            <span> &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp; </span>

            <label>Category: </label>
            <select defaultValue="" onChange={filterByCategory}>
                <option disabled value="">Select Category...</option>
                <option>Food</option>
                <option>Clothing</option>
                <option>Toys</option>
                <option>Books</option>
            </select>

            <hr />

            {coupons.map(c => <CouponCard key={c.id} coupon={c} />)}
        </div>
    );
}

export default CustomerCoupons;
