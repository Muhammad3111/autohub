import React, {
    createContext,
    useContext,
    ReactNode,
    useMemo,
    useState,
} from "react";

interface AuthContextProps {
    isLogin: boolean;
    language: string;
    setLanguage: (lang: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const token = localStorage.getItem("access_token");

    const isLogin = useMemo(() => !!token, [token]);

    const [language, setLanguageState] = useState<string>(
        localStorage.getItem("language") || "uz"
    );

    const setLanguage = (lang: string) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <AuthContext.Provider value={{ isLogin, language, setLanguage }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
