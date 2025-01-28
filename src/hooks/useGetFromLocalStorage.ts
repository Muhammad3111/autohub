export const getFromLocalStorage = <T>(
    key: string,
    defaultValue?: T
): T | null => {
    const value = localStorage.getItem(key);
    if (!value) {
        return defaultValue !== undefined ? defaultValue : null;
    }

    try {
        return JSON.parse(value);
    } catch {
        return value as unknown as T;
    }
};
