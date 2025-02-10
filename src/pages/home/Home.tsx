import Brands from "./Brands";
import Categories from "./Categories";

const Home = () => {
    return (
        <div className="flex flex-col gap-10 mt-12">
            <Brands />
            <Categories />
        </div>
    );
};

export default Home;
