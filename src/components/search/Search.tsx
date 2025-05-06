import React, { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Context } from "../../context/Context";
import { useLazyGetSearchDataQuery } from "../../features/search/search";
import { FiX } from "react-icons/fi";

const Search = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const location = useLocation();
    const context = useContext(Context);
    if (!context) {
        throw new Error(
            "Ushbu component context providerdan tashqarida ishlatilmoqda"
        );
    }

    // Initialize inputValue from URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const initialQuery = queryParams.get("query") || "";
    const [inputValue, setInputValue] = useState(initialQuery);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const { setSelected } = context;
    const [customLoading, setCustomLoading] = useState(false);

    const [searchTrigger, { data, isLoading }] = useLazyGetSearchDataQuery();
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Sync inputValue with URL query parameter changes
    useEffect(() => {
        const query = new URLSearchParams(location.search).get("query") || "";
        setInputValue(query);
    }, [location.search]);

    const handleClickOutside = (e: MouseEvent) => {
        const input = inputRef.current;
        const results = resultsRef.current;

        if (input && results) {
            if (
                !input.contains(e.target as Node) &&
                !results.contains(e.target as Node)
            ) {
                setIsFocused(false);
            }
        } else if (input) {
            if (!input.contains(e.target as Node)) {
                setIsFocused(false);
            }
        } else {
            setIsFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setCustomLoading(false);
        }
    }, [isLoading]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);

        // if (location.pathname.includes("search")) {
        //     if (value.trim().length) {
        //         navigate(`/search?query=${encodeURIComponent(value)}`, {
        //             replace: true
        //         });
        //     } else {
        //         navigate("/search", { replace: true });
        //     }
        // }

        setCustomLoading(true);
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(() => {
            if (value.trim().length) {
                searchTrigger({ query: value, page: 1, type: null });
            }
            setCustomLoading(false);
        }, 3000);

        setTimer(newTimer);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (inputValue.trim().length) {
            navigate(`/search?query=${encodeURIComponent(inputValue)}`);
        }
    };

    const handleItemClick = (itemName: string) => {
        navigate(`/search?query=${encodeURIComponent(itemName)}`, {
            replace: true,
        });
        setSelected({ name: itemName, value: itemName });
        setInputValue(itemName);
        setIsFocused(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center w-[550px] relative"
        >
            <div className="w-full relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    className="w-full h-10 px-4 focus:outline-none text-black border-2 border-primary"
                />
                {!isFocused && inputValue === "" && (
                    <div className="absolute top-0 left-4 right-0 h-full flex text-gray-500 items-center justify-start pointer-events-none">
                        <Typewriter
                            options={{
                                strings: [
                                    "BYD",
                                    "BMW",
                                    "Chevrolet",
                                    "Zeekr",
                                    "LeapMotors",
                                ],
                                autoStart: true,
                                loop: true,
                                delay: 75,
                                deleteSpeed: 50,
                            }}
                        />
                    </div>
                )}

                {!location.pathname.includes("search") &&
                    inputValue.trim().length > 0 && (
                        <FiX
                            className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-primary"
                            onClick={() => {
                                setInputValue("");
                                setIsFocused(false);
                                navigate("/search", { replace: true });
                            }}
                        />
                    )}
            </div>

            {customLoading && inputValue.trim().length > 0 && (
                <div className="absolute top-full left-0 w-full bg-white border-2 border-primary shadow-lg mt-1 z-10 p-2 text-center text-gray-500">
                    {t("loading")}...
                </div>
            )}

            {data &&
                data.items.length === 0 &&
                inputValue.trim().length > 0 &&
                !customLoading && (
                    <div className="absolute top-full left-0 w-full bg-white border-2 border-primary shadow-lg mt-1 z-10 p-2 text-center text-gray-500">
                        {t("not-found")}
                    </div>
                )}

            {data &&
                data.items.length > 0 &&
                !customLoading &&
                inputValue.trim().length > 0 &&
                isFocused && (
                    <div
                        ref={resultsRef}
                        className="absolute top-full left-0 w-full bg-white border-2 border-primary shadow-lg mt-1 z-10 overflow-hidden"
                    >
                        {data.items.map(
                            (item: any) =>
                                item && (
                                    <div
                                        key={item.id}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() =>
                                            handleItemClick(
                                                item.name_uz ||
                                                    item.title_uz ||
                                                    item.workplace_name
                                            )
                                        }
                                    >
                                        {item.name_uz ||
                                            item.title_uz ||
                                            item.workplace_name}
                                    </div>
                                )
                        )}
                    </div>
                )}

            <button
                type="submit"
                className="bg-primary active:bg-primary-hover duration-150 text-white h-10 px-2"
            >
                {t("navbar.search")}
            </button>
        </form>
    );
};

export default Search;
