import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Search = () => {
    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(search);
    const query = searchParams.get("query");

    const [inputValue, setInputValue] = useState(query || "");
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (pathname.includes("/search")) {
            navigate(`/search?query=${encodeURIComponent(inputValue)}`);
        } else {
            if (inputValue.trim().length > 0) {
                navigate(`/search?query=${encodeURIComponent(inputValue)}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center w-[550px]">
            <div className="relative w-full">
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full h-10 px-4 focus:outline-none text-black border-2 border-primary"
                />

                {!isFocused && inputValue === "" && (
                    <div className="absolute top-0 left-4 w-full h-full flex text-gray-500 items-center justify-start pointer-events-none">
                        <Typewriter
                            options={{
                                strings: [
                                    "Onix",
                                    "Tracker",
                                    "Malibu",
                                    "Equinox",
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 75,
                                deleteSpeed: 50,
                            }}
                        />
                    </div>
                )}
            </div>
            <button type="submit" className="bg-primary text-white h-10 px-2">
                Search
            </button>
        </form>
    );
};
export default Search;
