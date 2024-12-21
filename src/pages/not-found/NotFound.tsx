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

                    <h1 className="text-6xl font-bold mb-4 mt-10">404 Error</h1>

                    <p className="text-sm">We are sorry, page not found.</p>

                    <Button path="/">Back To Home</Button>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default NotFound;
