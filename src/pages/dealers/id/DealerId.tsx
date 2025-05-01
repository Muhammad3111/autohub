import { Navigate, useParams } from "react-router-dom";
import Header from "../../../components/header/Header";
import Image from "../../../components/image/Image";
import { useGetDealersQuery } from "../../../features/auth/authApiSlice";

const DealerId = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading } = useGetDealersQuery({
        page: 1,
        staff_type: "dealer",
    });

    const singleDealer = data?.find((dealer) => dealer.id === id);

    if (!isLoading && !singleDealer) {
        return <Navigate to="/not-found" />;
    }

    if (isLoading) {
        return <p>Yuklanmoqda...</p>;
    }

    return (
        <div>
            <Header title={singleDealer?.workplace_name || "Dealer"} />
            <div className="mt-20 p-10 shadow-md bg-white flex items-center justify-between gap-20">
                <div className="w-full h-[380px]"></div>
                <div className="w-full h-[380px]">
                    <Image
                        src={singleDealer?.avatar || ""}
                        alt="Dealer avatar"
                    />
                </div>
            </div>
        </div>
    );
};
export default DealerId;
