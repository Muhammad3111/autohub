import { useLocation } from "react-router-dom";
import EmptySearch from "./EmptySearch";
import SearchData from "./SearchData";

const SearchPage = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    return (
        <div>
            {location.pathname === "/search" && !location.search ? (
                <EmptySearch />
            ) : (
                <SearchData searchValue={query || ""} />
            )}
        </div>
    );
};

export default SearchPage;
