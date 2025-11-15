"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import AuthProvider from '@/providers/AuthProvider';
import { NavBar } from '@/components/comman';

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
          }}
        >
          <NavBar />
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
        </GoogleReCaptchaProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default Provider;