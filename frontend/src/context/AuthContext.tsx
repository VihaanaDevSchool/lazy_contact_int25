import { createContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin, logout as apiLogout } from "../api/auth";

// Define the shape of the context
interface AuthContextType {
  user: { id: string; name: string; email: string } | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
