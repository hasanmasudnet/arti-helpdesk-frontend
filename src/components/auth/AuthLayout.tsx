import { ThemeToggle } from "@/components/ThemeToggle";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full max-w-[400px] space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
            <ThemeToggle />
          </div>
          {children}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative bg-muted">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1617195920950-1145bf9a9c72?q=80&w=2070&auto=format&fit=crop)",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex items-center justify-center p-8 text-white">
          <div className="max-w-[400px] space-y-4">
            <h2 className="text-3xl font-bold">Welcome to Helpdesk</h2>
            <p className="text-lg">
              Streamline your support operations with our modern ticket
              management system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
