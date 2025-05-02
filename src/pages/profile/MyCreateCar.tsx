import { useState } from "react";
import AddCar from "../../adminComponents/cars/AddCar";
import { useGetDealerCarsQuery } from "../../features/auth/authApiSlice";

import CardCar from "../../components/card/CardCar";

const MyCars = () => {
    const { data, isLoading } = useGetDealerCarsQuery({ page: 1 });

    const dealerCarsData = data as CarObject[];

    return (
        <div className='w-full mt-5 grid grid-cols-3 gap-5 justify-items-center bg-light relative'>
            {dealerCarsData &&
                dealerCarsData.map((item) => (
                    <CardCar key={item.id} vehicle={item} />
                ))}

            {isLoading && (
                <div className='w-full col-span-3 flex items-center justify-center h-[500px]'>
                    <div className='w-16 h-16 border-4 border-solid rounded-full border-primary border-t-transparent animate-spin mx-auto'></div>
                </div>
            )}
        </div>
    );
};

const MyCreateCar = () => {
    const [tab, setTab] = useState<"home" | "create">("home");

    const handleTabClick = () => {
        if (tab === "home") {
            setTab("create");
        } else {
            setTab("home");
        }
    };
    return (
        <div className='w-full h-full border border-[#ccc] rounded-md p-10'>
            <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl'>
                    {tab === "home"
                        ? "Mening Avtomobillarim"
                        : "Avtomobil qo'shish"}
                </h2>

                <button
                    onClick={handleTabClick}
                    className={`bg-primary hover:bg-primary-hover duration-150 text-white py-2.5 shadow-custom shadow-gray-400 font-medium flex items-center gap-4 px-4`}
                >
                    {tab === "home" ? "Moshina qo'shish" : "Ortga"}
                </button>
            </div>
            {tab === "home" ? <MyCars /> : <AddCar />}
        </div>
    );
};
export default MyCreateCar;
