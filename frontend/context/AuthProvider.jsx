"use client"
import { createContext, useContext, useEffect, useState } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const logout = () => {
        setUser({});
    }
    
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
        {children}
        </AuthContext.Provider>
    )
}