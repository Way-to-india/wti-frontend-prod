'use client';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { endPoints } from '@/constants/endpoints';

export default function AuthProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { logout, setLoading, isAuthenticated } = useAuthStore();
  
  useEffect(() => {
      const verifyAuth = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(endPoints.user.profile, {
          credentials: 'include',
        }); 
        if (response.ok) {
          // const userData = await response.json();
          // login(userData);
        } else {
          logout();
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    
    verifyAuth();
  }, []); 
  
  return <>{children}</>;
}