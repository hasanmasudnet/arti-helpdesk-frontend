import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UserRole = "admin" | "agent" | "customer";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    // Simulate different user roles based on credentials
    let userData: User | null = null;

    if (username === "admin" && password === "admin") {
      userData = {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
      };
    } else if (username === "agent" && password === "agent") {
      userData = {
        id: "2",
        name: "Agent User",
        email: "agent@example.com",
        role: "agent",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=agent",
      };
    } else if (username === "customer" && password === "customer") {
      userData = {
        id: "3",
        name: "Customer User",
        email: "customer@example.com",
        role: "customer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=customer",
      };
    } else {
      throw new Error("Invalid credentials");
    }

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
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
        isAuthenticated: !!user,
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
