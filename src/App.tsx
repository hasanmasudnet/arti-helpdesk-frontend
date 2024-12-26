import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, ProtectedRoute } from "@/lib/auth";
import { ThemeProvider } from "@/components/ThemeProvider";
import MainLayout from "@/components/layout/MainLayout";
import Home from "@/components/home";
import LoginPage from "@/pages/auth/login";
import SignUpPage from "@/pages/auth/signup";
import VerifyPage from "@/pages/auth/verify";
import ForgotPasswordPage from "@/pages/auth/forgot-password";
import AdminManagement from "@/components/management/AdminManagement";
import UserManagement from "@/components/management/UserManagement";
import TicketManagement from "@/components/helpdesk/TicketManagement";
import TicketDetails from "@/components/helpdesk/TicketDetails";
import CustomerManagement from "@/components/management/CustomerManagement";
import CustomerDetails from "@/components/management/CustomerDetails";
import AgentManagement from "@/components/management/AgentManagement";
import ProductManagement from "@/components/management/ProductManagement";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="helpdesk-theme">
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/tickets" element={<TicketManagement />} />
            <Route path="/tickets/:id" element={<TicketDetails />} />

            {/* Admin & Agent Only Routes */}
            <Route
              path="/customers"
              element={
                <ProtectedRoute allowedRoles={["admin", "agent"]}>
                  <CustomerManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customers/:id"
              element={
                <ProtectedRoute allowedRoles={["admin", "agent"]}>
                  <CustomerDetails />
                </ProtectedRoute>
              }
            />

            {/* Admin Only Routes */}
            <Route
              path="/agents"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AgentManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ProductManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
