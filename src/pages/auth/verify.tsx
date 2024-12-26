import AuthLayout from "@/components/auth/AuthLayout";
import OTPVerification from "@/components/auth/OTPVerification";

const VerifyPage = () => {
  return (
    <AuthLayout
      title="Verify your email"
      subtitle="Please enter the verification code sent to your email"
    >
      <OTPVerification
        email="user@example.com"
        onVerify={(otp) => {
          console.log("Verifying OTP:", otp);
        }}
        onResend={() => {
          console.log("Resending OTP");
        }}
      />
    </AuthLayout>
  );
};

export default VerifyPage;
