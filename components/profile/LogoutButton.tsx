'use client';

import { FiLogOut } from 'react-icons/fi';
import { useState } from 'react';
import { useAuthStore } from '@/store/AuthStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogoutButton() {
  const [isHovered, setIsHovered] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <button
      onClick={handleLogout}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-red-600 transition-all duration-300 hover:scale-105"
    >
      <FiLogOut className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
      <span>Logout</span>
    </button>
  );
}