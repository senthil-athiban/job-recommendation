"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { LoginFormInput } from "@/types/auth";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { authApi } from "@/lib/api";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormInput>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange =
    (field: keyof LoginFormInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authApi.login(formData);
      const token = res.data.token;
      if(token) {
        login(token);
        router.push("/home");
      }
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.log("error:", error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@gmail.com"
              required
              onChange={handleChange("email")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                onChange={handleChange("password")}
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                tabIndex={-1}
                className="absolute top-0 right-0 hover:bg-gray-50"
                onClick={() => setShowPassword(p => !p)}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </div>
          <Button type="submit" className="w-full cursor-pointer hover:bg-gray-600">
            Login
          </Button>
        </form>
        <CardFooter className="p-0">
          <span className="text-xs mt-4">
          Not have an account? <Link href={"/signup"} className="underline">Register here</Link>
          </span>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
export default Login;
