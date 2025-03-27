import { Navigate, useLocation, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";

type DealerIdType = {
    id: string;
    img: string;
    title: string;
    mainBrands: string;
    electricity: string;
    landsite: string;
};

const DealerId = () => {
    const location = useLocation();
    const state = location.state as DealerIdType;
    const { id } = useParams<{ id: string }>();

    if (state?.id !== id) {
        return <Navigate to={"/not-found"} />;
    }

    return (
        <div>
            <Header title={state.title} />
            {state?.id === id && (
                <div className="mt-20">
                    <img src={state.img} alt="" />
                </div>
            )}
        </div>
    );
};
export default DealerId;
