import Brands from "./Brands";
import CarPrices from "./CarPrices";
import CarTypes from "./CarTypes";
import Categories from "./Categories";

const Home = () => {
    return (
        <div className='w-full h-full flex flex-col gap-10'>
            <CarTypes />
            <CarPrices />
            <Brands />
            <Categories />
        </div>
    );
};

export default Home;
