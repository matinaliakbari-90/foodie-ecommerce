"use client";

import { createContext, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    loginContext: (user: User) => void
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)

    const loginContext = (user: User) => {
        setUser(user)
    }

    return (
        <AuthContext value={{ user, loginContext }}>
            {children}
        </AuthContext>
    )
}


export default AuthContext