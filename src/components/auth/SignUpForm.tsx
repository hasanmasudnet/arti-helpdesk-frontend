import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/lib/auth";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  type SignUpFormValues = z.infer<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 1500));
  //   setLoading(false);
  //   navigate("/verify");
  // };

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("signup data:", data);
    setLoading(true);
    try {
      await signUp(data);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
    // Perform login action (e.g., call API)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            type="text"
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect="off"
            disabled={loading}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={loading}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={loading}
              className="pr-10"
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="grid gap-1">
          <Label htmlFor="company">Company Name (Optional)</Label>
          <Input
            id="company"
            placeholder="Acme Inc."
            type="text"
            autoComplete="organization"
            disabled={loading}
            {...register("company")}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              {errors.company.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="terms" {...register("isaggree_terms_privacy")} />
        <Label htmlFor="terms" className="text-sm font-normal">
          I agree to the{" "}
          <Link
            to="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
        </Label>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" type="button" disabled={loading}>
          <img src="/google.svg" alt="Google" className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button variant="outline" type="button" disabled={loading}>
          <img src="/github.svg" alt="GitHub" className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className={cn(
            "underline underline-offset-4 hover:text-primary",
            loading && "pointer-events-none opacity-50"
          )}
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
