import { createStore } from "redux";
import CouponModel from "../Models/CouponModel";

export class CustomersState {
    public coupons: CouponModel[] = [];
}

export enum CustomersActionType {
    FetchCoupons = "FetchCoupons",
    BuyCoupon = "BuyCoupon"
}

export interface CustomersAction {
    type: CustomersActionType;
    payload: any;
}

export function fetchCouponsAction(coupons: CouponModel[]): CustomersAction {
    return { type: CustomersActionType.FetchCoupons, payload: coupons };
}
export function buyCouponAction(coupon: CouponModel): CustomersAction {
    return { type: CustomersActionType.BuyCoupon, payload: coupon };
}

export function customersReducer(currentState = new CustomersState(), action: CustomersAction): CustomersState {

    const newState = { ...currentState };

    switch (action.type) {

        case CustomersActionType.FetchCoupons:
            newState.coupons = action.payload;
            break;

        case CustomersActionType.BuyCoupon:
            newState.coupons.push(action.payload);
            break;
    }

    return newState;
}

export const customersStore = createStore(customersReducer);
