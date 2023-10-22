"use client"
import { useState, useEffect } from 'react';



export const getSavedValue = (key, initialValue) => {
    if(typeof window === 'undefined') return initialValue;

    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;

    if (initialValue instanceof Function) return initialValue();
    return initialValue;
}




export default function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => getSavedValue(key, initialValue));

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));

    }, [key, value]);

    return [value, setValue];
}
