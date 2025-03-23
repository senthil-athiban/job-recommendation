"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import JobsTab from "@/components/Home/job.component";
import { Loader2 } from "lucide-react";

const HomePage = () => {
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
  return (
    <>
      <JobsTab />
    </>
  );
};

export default HomePage;
