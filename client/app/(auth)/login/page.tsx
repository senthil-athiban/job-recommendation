
import React from "react";
import Login from "@/components/Auth/login.component";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
