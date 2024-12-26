import { FiSearch } from "react-icons/fi";
import TypewriterInput from "./TypeWritter";

const Categories = () => {
    return (
        <div className="container mx-auto w-full py-10">
            <div className="">
                <p className="text-4xl font-semibold">
                    Human Answers to Car Questions
                </p>
                <p className="text-xl font-semibold">
                    24,015,433 stories from personal experience of car owners
                </p>

                <div>
                    <FiSearch />
                    <TypewriterInput />
                </div>
            </div>
        </div>
    );
};

export default Categories;
