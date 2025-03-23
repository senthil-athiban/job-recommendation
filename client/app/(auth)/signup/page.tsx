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
    <>
      <Signup />
    </>
  );
};

export default SignuPage;
