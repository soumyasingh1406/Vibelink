"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    name: string;
    avatar: string;
    gender?: string;
    interests: string[];
    vibeCharacteristics?: {
        nightOwl: boolean;
        texter: boolean;
    };
    vibeScore?: number; // For compatibility
}

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUserState] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load from localStorage if persists
    useEffect(() => {
        const saved = localStorage.getItem('vibelink_user');
        if (saved) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUserState(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse user data", e);
            }
        }
        setIsLoading(false);
    }, []);

    const setUser = (newUser: User) => {
        setUserState(newUser);
        localStorage.setItem('vibelink_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUserState(null);
        localStorage.removeItem('vibelink_user');
    };

    return (
        <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
}
