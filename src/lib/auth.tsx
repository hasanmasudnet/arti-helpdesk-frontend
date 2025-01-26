import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "./apiInstance";

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
  signUp: (data: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser]: any = useState(null);
  const navigate = useNavigate();

  const signUp = async (data: any) => {
    try {
      const { name, email, password, company, isaggree_terms_privacy } = data;
      const formData: any = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", password);
      formData.append("company", company);

      const response = await apiInstance.post("/auth/register", formData);

      // localStorage.setItem("user", JSON.stringify(response?.data?.user));
      // localStorage.setItem(
      //   "access_token",
      //   JSON.stringify(response?.data?.access_token)
      // );

      console.log(response, "res++");
      navigate("/verify", { state: { email: formData.get("email") } });
      // navigate("/dashboard");
    } catch (error) {
      console.log(error, "error");
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response: any = await apiInstance.post("/auth/login", {
        email,
        password,
      });

      if (response?.data?.user?.email_verified) {
        localStorage.setItem("user", JSON.stringify(response?.data?.user));
        localStorage.setItem(
          "access_token",
          JSON.stringify(response?.data?.access_token)
        );

        setUser(response?.data?.user);
        navigate("/dashboard");
      } else {
        try {
          const response = await apiInstance.post("/auth/resend-otp", {
            email,
          });
          console.log("verify response");
          navigate("/verify", { state: { email: email } });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {}
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
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
        signUp,
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
  // const { user, isAuthenticated } = useAuth();
  // const context = useContext(AuthContext);
  const user = JSON.parse(localStorage?.getItem("user")) || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user && !allowedRoles.includes(user.role)) {
      navigate("/dashboard");
    }
  }, [user]);

  // if (!isAuthenticated || (user && !allowedRoles.includes(user.role))) {
  //   return null;
  // }

  return <>{children}</>;
}
