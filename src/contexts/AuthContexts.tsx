import { createContext, useContext, useEffect, useState } from "react";
import { type AuthContextType, type AuthProviderProps } from "../types/Auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('todoAuthToken');
        if(savedToken){
            setToken(savedToken);
        }
    }, [])

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem('todoAuthToken', newToken);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem('todoAuthToken');
    }

    const isAuthenticated = !!token;

    return (
        <AuthContext.Provider value = {{ token, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

