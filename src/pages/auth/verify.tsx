import AuthLayout from "@/components/auth/AuthLayout";
import OTPVerification from "@/components/auth/OTPVerification";
import { apiInstance } from "@/lib/apiInstance";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const VerifyPage = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const verifyOtp = async (otp) => {
    setOtp(otp);
    try {
      const email = location?.state?.email;
      const response = await apiInstance.post("/auth/verify-otp", {
        otp,
        email,
      });
      console.log(response, "verify response");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Please enter the verification code sent to your email"
    >
      <OTPVerification
        email="user@example.com"
        onVerify={verifyOtp}
        onResend={async () => {
          try {
            const email = location?.state?.email;

            const response = await apiInstance.post("/auth/resend-otp", {
              email,
            });
            console.log(response, "verify response");
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </AuthLayout>
  );
};

export default VerifyPage;
