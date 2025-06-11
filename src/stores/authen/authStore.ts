import { create } from 'zustand';
import { createWithDevtools, createWithPersist } from '../middlewares';

type AuthStore = {
    isAuthenticated: boolean;
    token: string | null;
}

type AuthActions = {
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthStore & AuthActions>(
    createWithDevtools(
        createWithPersist(
            (set) => ({
                isAuthenticated: false,
                token: null,
                login: (token: string) => set({ isAuthenticated: true, token }),
                logout: () => set({ isAuthenticated: false, token: null })
            }),
            'auth-store'
        ),
        'AuthStore'
    )
)