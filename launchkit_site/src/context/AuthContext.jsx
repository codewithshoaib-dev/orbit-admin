import React, { createContext, useState, useEffect, useCallback } from "react";
import api, { setLogoutHandler } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get("/user", { withCredentials: true });
      console.log(response.data)
      setUser(response.data); 
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch on app load
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Refresh user on tab focus or visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchUser();
      }
    };
    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchUser]);


  const login = async (username, password) => {
    try {
      const response = await api.post("/login", { username, password }, { withCredentials: true });
      await fetchUser();
      navigate("/dashboard");
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response?.data) {
        return { success: false, errors: error.response.data }; // assuming your API returns {username: [...], password: [...]} or {non_field_errors: [...]}
      }
      return { success: false, errors: { non_field_errors: ["Server error. Please try again."] } };
    }
  };
  

  const logout = async () => {
    try {
      await api.post("/logout", {}, { withCredentials: true });
      console.log('Loggin out')
      
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      
      //navigate("/login");
    }
  };

  useEffect(() => {
    setLogoutHandler(logout);
  }, [logout]);

  const isAuthenticated = !loading && !!user;

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
