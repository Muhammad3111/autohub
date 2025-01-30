import { useState } from "react";
import SimpleSearchInput from "../../utility/search-input/SimpleSearchInput";

const SearchData = ({ searchValue }: { searchValue: string }) => {
    const [search, setSearch] = useState(searchValue);

    return (
        <div className="flex gap-10 pt-5 px-10">
            {/* sidebar */}
            <div className="w-[300px] h-[400px] bg-white sticky left-0 top-[100px] border-2"></div>

            {/* search bar */}

            <div className="w-full">
                <h1 className="text-3xl font-medium">Izlash</h1>
                <SimpleSearchInput search={search} setSearch={setSearch} />
                <div className="w-full h-[500px] bg-white mt-10 rounded"></div>
            </div>
        </div>
    );
};
export default SearchData;
