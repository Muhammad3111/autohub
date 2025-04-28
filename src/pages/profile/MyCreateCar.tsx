import { useState } from "react";
import AddCar from "../../adminComponents/cars/AddCar";

const MyCars = () => {
    return <div>My Cars</div>;
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
