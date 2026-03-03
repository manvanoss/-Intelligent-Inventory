import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    setUser: (user: User) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,

            setUser: (user: User) => set({ user }),

            login: (user: User, token: string) => set ({
                user: user,
                token: token,
            }),

            logout: () => set({
                user: null,
                token: null,
            }),
        }),
        {
            name: 'supplyguard-auth', // Key in LocalStorage
            storage: createJSONStorage(() => localStorage),
        }
    )
);