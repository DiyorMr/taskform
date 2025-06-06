import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error: unknown) {
            console.error('Error reading from localStorage:', error);
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error: unknown) {
            console.error('Error writing to localStorage:', error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
}
