import type { ReactNode } from "react";

export interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export interface SignUpRespone {
    message: string;
    user?: {
        id: string;
        username: string;
        email: string;
    }
    token?: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export interface AuthProviderProps {
    children: ReactNode;
}