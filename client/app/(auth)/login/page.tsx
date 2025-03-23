"use client";
import React, { useEffect } from "react";
import Login from "@/components/Auth/login.component";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated , loading} = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/home");
    }
  }, [isAuthenticated, router, loading]);

  if(loading) {
    return (
      <div className='flex items-center justify-center min-h-screen animate-spin'>
        <Loader2 />
      </div>
    )
  }


  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
