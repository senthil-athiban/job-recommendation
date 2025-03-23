"use client";
import React, { useEffect } from "react";
import Signup from "@/components/Auth/signup.component";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const SignuPage = () => {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
      <Signup />
      </div>
    </div>
  );
};

export default SignuPage;
