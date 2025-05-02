import React, {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
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
  brands: string;
  setBrand: (brand: string) => void;
  model: string;
  setModel: (model: string) => void;
  price: Price;
  setPrice: (price: Price) => void;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  selected: SelectedType;
  setSelected: Dispatch<SetStateAction<SelectedType>>;
  comparedCars: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
};

export const Context = createContext<CarContextProps | undefined>(undefined);

interface CarProviderProps {
  children: ReactNode;
}

export const ContextProvider: React.FC<CarProviderProps> = ({ children }) => {
  const [brands, setBrand] = useState<string>(
    () => localStorage.getItem("brand") || ""
  );

  const [model, setModel] = useState<string>(
    () => localStorage.getItem("model") || "Cheksiz"
  );

  const [price, setPrice] = useState<Price>(() => {
    const storedPrice = localStorage.getItem("price");
    return storedPrice ? JSON.parse(storedPrice) : { id: 0, start: 0, end: 0 };
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [selected, setSelected] = useState<SelectedType>(() =>
    JSON.parse(localStorage.getItem("selected") || '{"name": "", "value": ""}')
  );

  const [comparedCars, setComparedCars] = useState<string[]>(() => {
    const stored = localStorage.getItem("compare_ids");
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // localStorage'ni doimiy ravishda yangilash
  useEffect(() => {
    localStorage.setItem("brand", brands);
  }, [brands]);

  useEffect(() => {
    localStorage.setItem("model", model);
  }, [model]);

  useEffect(() => {
    localStorage.setItem("price", JSON.stringify(price));
  }, [price]);

  useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  useEffect(() => {
    localStorage.setItem("compare_ids", JSON.stringify(comparedCars));
  }, [comparedCars]);

  // Compare funksiyalari
  const addToCompare = (id: string) => {
    setComparedCars((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const removeFromCompare = (id: string) => {
    setComparedCars((prev) => prev.filter((item) => item !== id));
  };

  return (
    <Context.Provider
      value={{
        brands,
        setBrand,
        model,
        setModel,
        price,
        setPrice,
        sidebarOpen,
        setSidebarOpen,
        selected,
        setSelected,
        comparedCars,
        addToCompare,
        removeFromCompare,
      }}
    >
      {children}
    </Context.Provider>
  );
};
