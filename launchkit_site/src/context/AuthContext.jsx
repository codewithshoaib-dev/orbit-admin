import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios"; 
import { useNavigate } from "react-router-dom";
import { setLogoutHandler } from "../api/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    

    // Fetch user details on app load
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/user", { withCredentials: true });
                setUser(response.data.user); 
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null); // Clear user data if fetching fails
            } finally {
                setLoading(false); // Stop loading after fetching
            }
        };

       fetchUser(); 
    }, []);

    // Keep checking authentication status
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await api.get("/user", { withCredentials: true });
                setUser(response.data.user); 
            } catch (error) {
                setUser(null); // Clear user data if request fails
            }
        };

        const interval = setInterval(checkAuthStatus, 60000); 
        return () => clearInterval(interval); 
    }, []);
    console.log(user)

    const login = async (username, password) => {
        try {
            console.log(username, password)
            const response = await api.post("/login", {username, password}, { withCredentials: true });
            setUser(response.data.user); 
            navigate("/dashboard"); 
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Invalid credentials or server error.");
        }
    };

    
    const logout = async () => {
        try {
            await api.post("/logout", {}, { withCredentials: true });
            setUser(null); 
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            throw new Error("Failed to log out. Please try again.");
        }
    };
    
    useEffect(() => {
        setLogoutHandler(logout);
    }, [logout]);

    return (
        <AuthContext.Provider value={{ user, loading, isAuthenticated: !!user, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };