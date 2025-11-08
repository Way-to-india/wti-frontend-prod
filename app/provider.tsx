"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from '@/providers/AuthProvider';
import { NavBar } from '@/components/comman';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavBar/>
        {children}
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Provider;
