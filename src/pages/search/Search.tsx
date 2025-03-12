import { useLocation } from "react-router-dom";
import EmptySearch from "./EmptySearch";
import SearchData from "./SearchData";

const SearchPage = () => {
    const location = useLocation();
    return (
        <div>
            {location.pathname === "/search" && !location.search ? (
                <EmptySearch />
            ) : (
                <SearchData />
            )}
        </div>
    );
};

export default SearchPage;
