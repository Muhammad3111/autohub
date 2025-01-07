import Footer from "../../components/footer/Footer";
// import Banner from "./Banner";
import Categories from "./Categories";
import Slider from "../../components/slider/Slider";

const Home = () => {
    return (
        <div>
            <Categories />
            {/* <Banner /> */}
            <Slider />
            <Footer />
        </div>
    );
};

export default Home;
