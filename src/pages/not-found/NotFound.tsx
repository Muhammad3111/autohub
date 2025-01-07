import WhellImage from "../../assets/error-wheel.svg";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Button from "../../utility/button/Button";

const NotFound = () => {
    return (
        <div>
            <Header title="404 Error" />

            <div className="w-full flex items-center justify-center p-20">
                <div className="flex flex-col items-center">
                    <img src={WhellImage} width={200} alt="" />

                    <h1 className="text-4xl font-bold mb-4 mt-10">
                        404 Xatolik
                    </h1>

                    <p>Biz siz izlagan sahifani topa olmadik.</p>

                    <Button path="/" className="px-6 mt-5">
                        Bosh sahifaga qaytish
                    </Button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NotFound;
