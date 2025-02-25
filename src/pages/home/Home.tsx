import Footer from "../../components/footer/Footer";
import Brands from "./Brands";
import Categories from "./Categories";

const Home = () => {
  return (
    <div className="px-10 flex flex-col gap-10 mt-16 max-w-[1400px] mx-auto">
      <Brands />
      <Categories />
      <Footer />
    </div>
  );
};

export default Home;
