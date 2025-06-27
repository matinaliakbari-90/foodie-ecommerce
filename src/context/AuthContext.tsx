"use client";

import { me } from "@/actions/auth";
import { createContext, useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    loginContext: (user: User) => void;
    logoutContext: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)

    const loginContext = (user: User) => {
        setUser(user)
    }


    useEffect(() => {
        const checkExistUserLogin = async () => {
            const data = await me();
            
            if (data.error) {
                setUser(null)
            } else {
                setUser(data.user)
            }
        }

        checkExistUserLogin()
    }, [])


    const logoutContext = () => {
        setUser(null)
    }


    return (
        <AuthContext value={{ user, loginContext, logoutContext }}>
            {children}
        </AuthContext>
    )
}


export default AuthContext