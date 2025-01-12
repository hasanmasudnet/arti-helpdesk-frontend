import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface OTPVerificationProps {
  email?: string;
  onVerify?: (otp: string) => void;
  onResend?: () => void;
}

const OTPVerification = ({
  email = "user@example.com",
  onVerify = () => { },
  onResend = () => { },
}: OTPVerificationProps) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste event
      const pastedValue = value.slice(0, 6).split("");
      const newOtp = [...otp];
      pastedValue.forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      // Focus last input or next empty input
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
      inputRefs.current[focusIndex]?.focus();
      return;
    }

    // Handle normal input
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const otpString = otp.join("");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onVerify(otpString);
    setLoading(false);
  };

  const handleResend = () => {
    setTimer(300);
    onResend();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4 text-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            We've sent a verification code to
          </p>
          <p className="font-medium">{email}</p>
        </div>

        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={(e) => {
                e.preventDefault();
                const pastedData = e.clipboardData.getData("text");
                handleChange(index, pastedData);
              }}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-lg font-semibold"
              disabled={loading}
            />
          ))}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={otp.some((digit) => !digit) || loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Verify Email
        </Button>

        <div className="text-sm">
          <span className="text-muted-foreground">
            Didn't receive the code?{" "}
          </span>
          {timer > 0 ? (
            <span className="text-primary font-medium">{timer}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-primary hover:underline font-medium"
              disabled={loading}
            >
              Resend
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default OTPVerification;
