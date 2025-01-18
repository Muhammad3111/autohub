import Footer from "../../components/footer/Footer";
// import Banner from "./Banner";
import Categories from "./Categories";
import Slider from "../../components/slider/Slider";
import Card from "./Card";

const Home = () => {
    return (
        <div>
            <div className="my-container">
                <Categories />
                <Slider />
                <Card />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
