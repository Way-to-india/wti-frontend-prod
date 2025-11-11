'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { endPoints } from '@/constants/endpoints';
import Loader from '@/components/skeleton/Loader';

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

      if (!isAuthenticated || !token) {
        setLoading(false);
        setIsVerifying(false);
        return;
      }

      try {
        
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
          
        } else {
          console.log("Auth verification failed, logging out");
          logout();
        }
      } catch (error) {
        console.error('Auth verification failed:', error);        
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
        <Loader className='mt-20'/>
      </div>
    );
  }

  return <>{children}</>;
}