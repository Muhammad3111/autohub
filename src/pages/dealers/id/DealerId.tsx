import { Navigate, useLocation, useParams } from "react-router-dom";

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
        state?.id === id && (
            <div className="mt-10">
                <img src={state.img} alt="" />
            </div>
        )
    );
};
export default DealerId;
