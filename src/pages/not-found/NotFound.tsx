import { useNavigate } from "react-router-dom";
import WhellImage from "../../assets/error-wheel.svg";
import Header from "../../components/header/Header";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Header title="404 Error" />

            <div className="w-full flex items-center justify-center p-20">
                <div className="flex flex-col items-center">
                    <img src={WhellImage} width={200} alt="" />

                    <h1 className="text-6xl font-bold mb-4 mt-10">404 Error</h1>

                    <p className="text-sm">We are sorry, page not found.</p>

                    <button
                        onClick={() => navigate("/")}
                        className="bg-primary text-white py-2.5 shadow-second shadow-gray-400 font-medium px-10 rounded-sm mt-10"
                    >
                        Back To Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
