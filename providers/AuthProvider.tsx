'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { endPoints } from '@/constants/endpoints';

export default function AuthProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { logout, setLoading, isAuthenticated, token, isHydrated, user } = useAuthStore();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    
    if (!isHydrated) {
      return;
    }

    const verifyAuth = async () => {
      console.log("Verifying auth - isAuthenticated:", isAuthenticated, "token:", !!token);

      // If not authenticated, just set loading to false
      if (!isAuthenticated || !token) {
        setLoading(false);
        setIsVerifying(false);
        return;
      }

      try {
        // Send token in Authorization header
        const response = await fetch(endPoints.user.profile, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Auth verified successfully:", data);
          // User is still authenticated, keep them logged in
        } else {
          console.log("Auth verification failed, logging out");
          logout();
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        // On network error, don't logout immediately - keep user logged in
        // Only logout on 401/403 errors
        console.log("Network error during auth verification - keeping user logged in");
      } finally {
        setLoading(false);
        setIsVerifying(false);
      }
    };

    verifyAuth();
  }, [isHydrated, isAuthenticated, token]); 

  if (!isHydrated || isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}