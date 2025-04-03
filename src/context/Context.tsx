import React, {
    createContext,
    useState,
    ReactNode,
    useEffect,
    Dispatch,
    SetStateAction
} from "react";

type Price = {
    id: number;
    start: number;
    end: number;
};

type SelectedType = {
    name: string;
    value: string;
};

type CarContextProps = {
    brand: string;
    setBrand: (brand: string) => void;
    model: string;
    setModel: (model: string) => void;
    price: Price;
    setPrice: (price: Price) => void;
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    selected: SelectedType;
    setSelected: Dispatch<SetStateAction<SelectedType>>;
};

export const Context = createContext<CarContextProps | undefined>(undefined);

interface CarProviderProps {
    children: ReactNode;
}

export const ContextProvider: React.FC<CarProviderProps> = ({ children }) => {
    // Dastlabki qiymatlarni localStorage'dan olish
    const [brand, setBrand] = useState<string>(
        () => localStorage.getItem("brand") || ""
    );
    const [model, setModel] = useState<string>(
        () => localStorage.getItem("model") || "Cheksiz"
    );
    const [price, setPrice] = useState<Price>(() => {
        const storedPrice = localStorage.getItem("price");
        return storedPrice
            ? JSON.parse(storedPrice)
            : { id: 0, start: 0, end: 0 };
    });

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [selected, setSelected] = useState<{ name: string; value: string }>(
        () =>
            JSON.parse(
                localStorage.getItem("selected") || '{"name": "", "value": ""}'
            )
    );

    // Har safar state o'zgarganda localStorage'ni yangilash
    useEffect(() => {
        localStorage.setItem("brand", brand);
    }, [brand]);

    useEffect(() => {
        localStorage.setItem("model", model);
    }, [model]);

    useEffect(() => {
        localStorage.setItem("price", JSON.stringify(price));
    }, [price]);

    useEffect(() => {
        localStorage.setItem("selected", JSON.stringify(selected));
    }, [selected]);

    return (
        <Context.Provider
            value={{
                brand,
                setBrand,
                model,
                setModel,
                price,
                setPrice,
                sidebarOpen,
                setSidebarOpen,
                selected,
                setSelected
            }}
        >
            {children}
        </Context.Provider>
    );
};
