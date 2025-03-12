import Advertisement from "./Advertisement";
import Brands from "./Brands";
import CarPrices from "./CarPrices";
import Categories from "./Categories";

const Home = () => {
    return (
        <div className="w-full h-full flex flex-col gap-10">
            <Brands />
            <Advertisement />
            <CarPrices />
            <Categories />
        </div>
    );
};

export default Home;
