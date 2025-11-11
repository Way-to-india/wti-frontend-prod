'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { endPoints } from '@/constants/endpoints';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuthStore } from '@/store/AuthStore';

const SignUpForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const signupMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(endPoints.auth.signup, formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return response.data;
    },
    onSuccess: (res) => {
      console.log("Signup response:", res);

      // Login user after successful signup with token
      const user = res.payload?.user || res.user;
      const token = res.payload?.token || res.token;

      if (user && token) {
        login(user, token);
        toast.success(res.message || "Signup Successful");
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
      console.error("Signup error:", error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Something Went Wrong";
        toast.error(message);
        setErrorMessage(message);
      } else {
        setErrorMessage('Something went wrong');
        toast.error('Something went wrong');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    signupMutation.mutate();
  };

  const isLoading = signupMutation.isPending;

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-form-label mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-3 border border-form-input-border bg-form-input-bg text-form-input-text placeholder:text-form-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-form-focus-ring focus:border-transparent"
            required
            disabled={isLoading}
          />
        </div>

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
            className="w-full p-3 border border-form-input-border bg-form-input-bg text-form-input-text placeholder:text-form-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-form-focus-ring focus:border-transparent"
            required
            disabled={isLoading}
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
              placeholder="Enter your password (min. 8 characters)"
              className="w-full p-3 pr-10 border border-form-input-border bg-form-input-bg text-form-input-text placeholder:text-form-placeholder rounded-lg focus:outline-none focus:ring-2 focus:ring-form-focus-ring focus:border-transparent"
              required
              minLength={8}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-form-secondary-text hover:text-form-label transition-colors cursor-pointer"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs text-form-helper-text mt-1">Must be at least 8 characters long</p>
        </div>

        {errorMessage && (
          <div className="bg-form-error-bg border border-form-error-border rounded-lg p-3">
            <p className="text-form-error-text text-sm">{errorMessage}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-form-button-bg text-form-button-text p-3 rounded-lg hover:bg-form-button-hover transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;