import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

type PropsType = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SimpleSearchInput = ({ search, setSearch }: PropsType) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (pathname.includes("/search")) {
            navigate(`/search?query=${encodeURIComponent(search)}`);
        } else {
            if (search.trim().length > 0) {
                navigate(`/search?query=${encodeURIComponent(search)}`);
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center gap-4 mt-10 w-full sticky top-5 left-0"
        >
            <div className="flex items-center border pl-4 rounded-full focus-within:border-primary duration-150 w-full bg-white ">
                <FiSearch className="text-2xl text-gray-500" />
                <input
                    type="text"
                    className="w-full h-12 px-4 rounded-full text-lg focus:outline-none "
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Izlash"
                />
            </div>
            <button
                type="submit"
                className="bg-primary h-12 px-10 rounded-full text-white"
            >
                Izlash
            </button>
        </form>
    );
};
export default SimpleSearchInput;
