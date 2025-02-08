import Brands from "./Brands";
import Categories from "./Categories";

const Home = () => {
    return (
        <div className="px-10 flex flex-col gap-10 mt-16">
            <Brands />
            <Categories />
        </div>
    );
};

export default Home;
