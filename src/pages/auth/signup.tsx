import AuthLayout from "@/components/auth/AuthLayout";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Enter your information to get started"
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
