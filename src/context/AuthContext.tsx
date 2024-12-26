import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface AuthContextProps {
    isLogin: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const token = useLocalStorage.getItem({ key: "token", isJson: true });

    const isLogin = useMemo(() => !!token, [token]);

    return (
        <AuthContext.Provider value={{ isLogin }}>
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
