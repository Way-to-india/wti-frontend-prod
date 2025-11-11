'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { endPoints } from '@/constants/endpoints';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';

const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(endPoints.auth.login, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    },
    onSuccess: (res) => {
      console.log("Login response:", res);

      const user = res.payload?.user || res.user;
      const token = res.payload?.token || res.token;

      if (user && token) {
        login(user, token);
        toast.success(res.message || "Login Successful");
        console.log("User logged in, redirecting...");

        // Small delay to ensure state is persisted
        setTimeout(() => {
          router.push("/");
        }, 100);
      } else {
        toast.error("Invalid response from server");
        console.error("Missing user or token in response:", res);
      }
    },
    onError: (error) => {
      console.error("Login error:", error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Something Went Wrong";
        toast.error(message);
        setError(message);
      } else {
        const message = 'Something went wrong';
        toast.error(message);
        setError(message);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate();
  };

  const isLoading = loginMutation.isPending;

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-form-label mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            disabled={isLoading}
            className="w-full p-3 border border-form-input-border bg-form-input-bg text-form-input-text placeholder:text-form-placeholder rounded-lg focus:ring-2 focus:ring-form-focus-ring focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-form-label mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              className="w-full p-3 pr-10 border border-form-input-border bg-form-input-bg text-form-input-text placeholder:text-form-placeholder rounded-lg focus:ring-2 focus:ring-form-focus-ring focus:outline-none"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-form-secondary-text hover:text-form-label transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-form-error-bg border border-form-error-border rounded-lg p-3 text-sm text-form-error-text">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-form-button-bg text-form-button-text p-3 rounded-lg hover:bg-form-button-hover transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;