import type { StateCreator } from "zustand";
import { persist, devtools, type StorageValue } from "zustand/middleware";

export const createWithDevtools = <T>(createStore: StateCreator<T>, name: string): StateCreator<T> => {
    return devtools(createStore, { name }) as StateCreator<T>;
}

export const createWithPersist = <T>(createStore: StateCreator<T>, name: string): StateCreator<T> => {
    return persist(
        createStore, {
            name,
            storage: {
                getItem: (key) => JSON.parse(sessionStorage.getItem(key) ?? " ") as StorageValue<T> | null,
                setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
                removeItem: (key) =>  sessionStorage.removeItem(key)
            }
        }
    ) as StateCreator<T>;
} 