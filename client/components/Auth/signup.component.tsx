"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { RegisterFormInput } from "@/types/auth";

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

const Signup = () => {
  const [formData, setFormData] = useState<RegisterFormInput>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange =
    (field: keyof RegisterFormInput) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const onSubmit = async () => {
    console.log("formdata:", formData);
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          ...formData,
        }
      );
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
            <Input
              id="password"
              type="password"
              required
              onChange={handleChange("password")}
            />
          </div>
          <Button type="button" className="w-full" onClick={onSubmit}>
            Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
