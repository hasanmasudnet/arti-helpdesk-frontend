import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import apiInstance from "@/lib/apiInstance";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [backendErrors, setBackendErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBackendErrors({});
    if (!formData.email || !formData.password) {
      setBackendErrors({
        email: !formData.email ? ["Email is required"] : [],
        password: !formData.password ? ["Password is required"] : [],
      });
      setLoading(false);
      return;
    }
    try {
      const response = await apiInstance.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors || {};
        const userFriendlyErrors = {};

        if (errors.email) {
          userFriendlyErrors.email = errors.email[0].includes('email') ? 'Please enter a valid email address.' : 'Email is required.';
        }
        if (errors.password) {
          userFriendlyErrors.password = errors.password[0].includes('password') ? 'The password is incorrect.' : 'Password is required.';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Show general error message */}
      {error && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}

      {/* Backend validation errors */}
      {backendErrors.general && (
        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded">
          {backendErrors.general}
        </div>)}
      <div className="grid gap-2">
        {/* Email field */}
        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Email"
            type="email"
            autoCapitalize="none"
            autoCorrect="off"
            disabled={loading}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          {backendErrors.email && (
            <div className="text-sm text-red-500">{backendErrors.email}</div>
          )}
        </div>

        {/* Password field */}
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              to="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
          {backendErrors.password && (
            <div className="text-sm text-red-500">{backendErrors.password}</div>
          )}
        </div>
      </div>

      <Button className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className={cn(
            "underline underline-offset-4 hover:text-primary",
            loading && "pointer-events-none opacity-50"
          )}
        >
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
