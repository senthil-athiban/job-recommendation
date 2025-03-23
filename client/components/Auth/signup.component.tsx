"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { RegisterFormInput } from "@/types/auth";

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
import { authApi } from "@/lib/api";
import Link from "next/link";

const Signup = () => {
  const [formData, setFormData] = useState<RegisterFormInput>({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange =
    (field: keyof RegisterFormInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const onSubmit = async () => {
    try {
      const res = await authApi.register(formData);
      toast.success(res.data.message);
    } catch (error: any) {
      console.log("error:", error);
      toast.success(error.response.data.error);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Sign up</CardTitle>
        <CardDescription>
          Resigter your email and password to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John doe"
              required
              onChange={handleChange("name")}
            />
          </div>
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
              <Button type="button" variant="ghost" size="icon" onClick={() => setShowPassword(p =>!p)} className="absolute px-3 py-2 right-0 top-0 hover:bg-gray-50 cursor-pointer">
                {showPassword ? <Eye /> : <EyeOff />}
              </Button>
            </div>
          </div>
          <Button type="button" className="w-full cursor-pointer hover:bg-gray-600" onClick={onSubmit}>
            Register
          </Button>
        </form>
        <CardFooter className="p-0">
          <span className="text-xs mt-4">
          Already have an account? <Link href={"/login"} className="underline">Login here</Link>
          </span>
        </CardFooter>
      </CardContent>
      
    </Card>
  );
};

export default Signup;
