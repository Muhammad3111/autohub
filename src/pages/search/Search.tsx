import { useLocation } from "react-router-dom";
import EmptySearch from "./EmptySearch";
import Footer from "../../components/footer/Footer";
import SearchData from "./SearchData";

const SearchPage = () => {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("query");

    return (
        <div>
            {!query && !location.pathname.includes("/search") ? (
                <EmptySearch />
            ) : (
                <SearchData searchValue={query || ""} />
            )}
            <Footer />
        </div>
    );
};

export default SearchPage;
