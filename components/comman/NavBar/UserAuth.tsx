// components/layout/UserAuth.tsx
'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';
import {
  User,
  LogOut,
  Settings,
  ChevronDown
} from 'lucide-react';
import Image from 'next/image';

const UserAuth: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    router.push('/');
  };

  const getUserInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name[0].toUpperCase();
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center">
        <Link
          href="/login"
          className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors rounded-lg shadow-sm whitespace-nowrap"
        >
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-orange-50 transition-colors"
        aria-label="User menu"
      >
        <div className="relative">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={36}
              height={36}
              className="w-9 h-9 rounded-full object-cover border-2 border-orange-500"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-sm border-2 border-orange-500">
              {getUserInitials()}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        <div className="hidden xl:flex flex-col items-start">
          <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
            {user.name}
          </span>
          <span className="text-xs text-gray-500">
            My Account
          </span>
        </div>

        <ChevronDown
          className={`hidden xl:block w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''
            }`}
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-orange-50">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-600 mt-0.5 truncate">
              {user.email}
            </p>
          </div>

          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
              onClick={() => setShowDropdown(false)}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
              onClick={() => setShowDropdown(false)}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </div>

          <div className="border-t border-gray-200 py-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAuth;