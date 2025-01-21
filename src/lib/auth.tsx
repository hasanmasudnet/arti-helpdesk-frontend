import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from './apiInstance';

type UserRole = "admin" | "agent" | "customer";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userFriendlyErrors, setBackendErrors] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiInstance.post("/api/auth/login", { email, password });
      if (response.status === 200) {
        const { access_token } = response.data;
        localStorage.setItem("access_token", access_token);
        const userData: any = await response?.data?.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/dashboard");
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (err: any) {
      if (err.response?.status === 422) {
        const errors = err.response.data.errors || {};
        const userFriendlyErrors: Record<string, string> = {};
        if (errors.email) {
          userFriendlyErrors.email = errors.email[0].includes("email")
            ? "Please enter a valid email address."
            : "Email is required.";
        }
        if (errors.password) {
          userFriendlyErrors.password = errors.password[0].includes("password")
            ? "The password is incorrect."
            : "Password is required.";
        }
        setBackendErrors(userFriendlyErrors);
      } else {
        setBackendErrors({
          general: "Oops! Something went wrong. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }

  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: true,
        // isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function ProtectedRoute({
  children,
  allowedRoles = ["admin", "agent", "customer"],
}: {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}) {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    console.log(localStorage.getItem('user'));


    if (!isAuthenticated) {
      navigate("/login");
    } else if (user && !allowedRoles.includes(user.role)) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate, allowedRoles]);

  if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
