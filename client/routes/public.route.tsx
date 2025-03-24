"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined" && isAuthenticated) {
      router.push("/home");
    }
    setIsLoading(false);
  }, [isAuthenticated, router]);

  if(isLoading) {
    return (
      <div className='flex items-center justify-center min-h-screen animate-spin'>
        <Loader2 />
      </div>
    )
  }
  return  <>{children}</>;
};

export default PublicRoute;