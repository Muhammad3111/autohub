import Footer from "../../components/footer/Footer";
import Advertisement from "./Advertisement";
import Brands from "./Brands";
import CarPrices from "./CarPrices";
import Categories from "./Categories";

const Home = () => {
    return (
        <div className="w-full">
            <div className="px-10 flex flex-col gap-10 mt-16 max-w-[1400px] mx-auto">
                <Brands />
                <Advertisement />
                <CarPrices />
                <Categories />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
