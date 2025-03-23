"use client";
import React from "react";
import Login from "@/components/Auth/login.component";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.push("/home");
    return;
  }

  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
