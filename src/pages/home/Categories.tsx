import { useState } from "react";
import SearchInput from "../../utility/search-input/SearchInput";

const Categories = () => {
    const [search, setSearch] = useState<string>("");

    return (
        <div className="container mx-auto w-full py-10">
            <div>
                <p className="text-4xl font-semibold">
                    Avtomobilingiz haqida ma'lumotga egamisiz ?
                </p>
                <p className="text-xl font-semibold mt-4">
                    Biz bilan savollaringizga javob toping.
                </p>

                <SearchInput search={search} setSearch={setSearch} />
            </div>
        </div>
    );
};

export default Categories;
