import { FiSearch } from "react-icons/fi";
import TypewriterInput from "./TypeWritter";

const Categories = () => {
    return (
        <div className="container mx-auto w-full py-10">
            <div>
                <p className="text-4xl font-semibold">
                    Avtomobilingiz haqida ma'lumotga egamisiz ?
                </p>
                <p className="text-xl font-semibold mt-4">
                    Biz bilan savollaringizga javob toping.
                </p>

                <div className="flex items-center gap-4 mt-10 w-full">
                    <div className="flex items-center border pl-4 rounded-full focus-within:border-primary duration-150 w-full">
                        <FiSearch className="text-2xl text-gray-500" />
                        <TypewriterInput />
                    </div>
                    <button className="bg-primary h-12 px-10 rounded-full text-white">
                        Izlash
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Categories;
