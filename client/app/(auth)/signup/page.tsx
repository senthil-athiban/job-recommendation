"use client";
import React from "react";
import Signup from "@/components/Auth/signup.component";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const SignuPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.push("/home");
    return;
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
      <Signup />
      </div>
    </div>
  );
};

export default SignuPage;
