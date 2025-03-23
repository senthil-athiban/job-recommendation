"use client";
import { useState } from "react";
import axios from "axios";
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
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormInput>({
    email: "",
    password: "",
  });

  const handleChange =
    (field: keyof LoginFormInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const onSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/v1/auth/login", {
        ...formData,
      });
      const token = res.data.token;
      login(token);
      router.push("/home");
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.log("error:", error);
      toast.success(error.response.data.error);
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
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              onChange={handleChange("email")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={handleChange("password")}
            />
          </div>
          <Button type="button" className="w-full" onClick={onSubmit}>
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
export default Login;