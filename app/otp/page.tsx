"use client"
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import Cookies from "js-cookie";
import { updateOtpCode, verifyOwner } from "@/services/api";

export default function OTP() {
  const [getWidth, setGetWidth] = useState(window.innerWidth);
  const [otp, setOtp] = useState("");
  const [doneOtp, setDoneOtp] = useState(false);
  const [otpNotFound, setOtpNotFound] = useState<{ status?: number; msg?: string }>({});
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const token = Cookies.get('token');

  useEffect(() => {
    const handleResize = () => setGetWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    const otpArray = inputRefs.current.map((ref) => ref?.value || "");
    const otpString = otpArray.join("");
    setOtp(otpString);
  };

  const handleUpdateOtpCode = async () => {
    try {
      await updateOtpCode(token as string, router);
      alert('OTP Code is updated')
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDoneOtp(true);
    if (otp.length === 6) {
      try {
        await verifyOwner(token as string, otp, router)
        router.push('/kamera')
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <header className="flex items-center justify-between mb-8">
          <div>
            <a 
                href="/owner-login" 
                className="flex flex-row items-center text-sm hover:cursor-pointer"
            >
              <ArrowLeft size={25} color="#3b82f6" className="inline-block" />
            </a>
          </div>
          <h1 className="text-2xl font-bold">OTP Verification</h1>
        </header>
        <main>
          <p className="mb-4 text-center">
            We’ve Sent An OTP code To{" "}
            {getWidth <= 500 ? (
              <>
                <br />
                <span>Your Email.</span>
              </>
            ) : (
              `Your Email.`
            )}
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="flex gap-2 mb-4">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="tel"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  value={otp[index] || ""}
                  onChange={(e) => handleInputChange(index, e)}
                  className="w-12 h-12 text-xl text-center border rounded-lg"
                />
              ))}
            </div>
            <span
              className={`${
                otpNotFound.status === 404 ? "block" : "hidden"
              } text-red-500 text-sm mb-4`}
            >
              {otpNotFound.msg}
            </span>
            <div className="mb-4">
              <p>
                Didn’t Get an OTP Code?{" "}
                <span onClick={handleUpdateOtpCode} className="text-blue-500 hover:cursor-pointer">
                  Resend Code
                </span>
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600"
              disabled={doneOtp}
            >
                {loading ? 'Loading...' : 'Masuk'}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
