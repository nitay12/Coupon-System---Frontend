import "./Home.css";
import homeImage from "../../../Assets/Images/coupons.webp";

function Home(): JSX.Element {
    return (
        <div className="Home">
			<img src={homeImage} />
        </div>
    );
}

export default Home;
