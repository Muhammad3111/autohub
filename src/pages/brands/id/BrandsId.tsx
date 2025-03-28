import { useLocation } from "react-router-dom";
import Header from "../../../components/header/Header";

const BrandsId = () => {
    const location = useLocation();
    const state = location.state as Brand | null;

    return (
        <div className="mt-20">
            <Header title={state?.name || "Brand Not Found"} />
            {state ? (
                <div>
                    <h2>{state.name}</h2>
                </div>
            ) : (
                <p>No brand data found</p>
            )}
        </div>
    );
};

export default BrandsId;
