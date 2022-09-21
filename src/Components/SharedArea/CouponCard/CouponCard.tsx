import CouponModel from "../../../Models/CouponModel";
import "./CouponCard.css";

interface CouponCardProps {
  coupon: CouponModel;
  buy?: (cuponId: number) => void;
}

function CouponCard(props: CouponCardProps): JSX.Element {
  const style = {
    backgroundImage: `url(${props.coupon.imageUrl})`,
  };

  return (
    <div className="CouponCard" style={style}>
      <span>Title: {props.coupon.title}</span> <br />
      <span>Description: {props.coupon.description}</span> <br />
      <span>Start Date: {props.coupon.startDate}</span> <br />
      <span>End Date: {props.coupon.endDate}</span> <br />
      <span>Category: {props.coupon.category}</span> <br />
      <span>Amount: {props.coupon.amount}</span> <br />
      <span>Price: {props.coupon.price}</span>
      {props.buy && (
        <button onClick={() => props.buy(props.coupon.id)}>🛒</button>
      )}
    </div>
  );
}

export default CouponCard;
