"use client";

import { useEffect} from "react";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();
  
    useEffect(() => {
      if (!isAuthenticated && !loading) {
        router.push("/login");
      }
    }, [isAuthenticated, router, loading]);
  
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen animate-spin">
          <Loader2 />
        </div>
      );
    }
  return  <>{children}</>;
};

export default ProtectedLayout;