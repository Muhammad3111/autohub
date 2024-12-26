type LocalStorageOptions = {
    key: string;
    value?: any;
    isJson?: boolean;
};

export const useLocalStorage = {
    setItem: ({ key, value, isJson }: LocalStorageOptions): void => {
        try {
            const data = isJson ? JSON.stringify(value) : value;
            localStorage.setItem(key, data);
        } catch (error) {
            console.error("Failed to set item in localStorage:", error);
        }
    },

    getItem: ({
        key,
        isJson,
    }: Pick<LocalStorageOptions, "key" | "isJson">): any => {
        try {
            const data = localStorage.getItem(key);
            if (data === null) return null;
            return isJson ? JSON.parse(data) : data;
        } catch (error) {
            console.error("Failed to get item from localStorage:", error);
            return null;
        }
    },

    removeItem: (key: string): void => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Failed to remove item from localStorage:", error);
        }
    },
};
