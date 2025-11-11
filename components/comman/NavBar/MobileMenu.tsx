// components/layout/MobileMenu.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';
import { 
  Menu, 
  X, 
  House, 
  TramFront, 
  Hotel, 
  Car, 
  Headset, 
  BookOpen,
  ChevronDown,
  User,
  LogOut,
} from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { icon: House, name: "Home", redirect: "/" },
  { icon: TramFront, name: "Tours", redirect: "/tours" },
  { icon: Hotel, name: "Hotels", redirect: "/hotels" },
  { icon: Car, name: "Transportation", redirect: "/transport" },
  { 
    icon: BookOpen, 
    name: "Tourist", 
    redirect: "/tourist",
    hasDropdown: true,
    submenu: [
      { name: "Destination", redirect: "/destinations" },
      { name: "Travel Guide", redirect: "/travel-guide" },
      { name: "Travel Tips", redirect: "/travel-tips" },
      { name: "Travel Toolkit", redirect: "/travel-toolkit" },
    ]
  },
  { icon: Headset, name: "Contact Us", redirect: "/contact-us" },
];

const MobileMenu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    // setIsOpen(false);
    // setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'unset';
    }
    
    // Cleanup function
    return () => {
      body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
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

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-orange-50 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo.png"
                width={150}
                height={45}
                alt="Way to India Logo"
                className="cursor-pointer"
                priority
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* User Section */}
          {isAuthenticated && user ? (
            <div className="px-4 py-4 border-b border-gray-200 bg-orange-50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold text-base border-2 border-orange-500">
                      {getUserInitials()}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-4 border-b border-gray-200">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 transition-colors rounded-lg"
              >
                Login / Sign Up
              </Link>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto py-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.redirect);

              if (link.hasDropdown && link.submenu) {
                return (
                  <div key={link.name}>
                    <button
                      onClick={() => handleDropdownToggle(link.name)}
                      className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-colors ${
                        active
                          ? 'text-orange-500 bg-orange-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{link.name}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          openDropdown === link.name ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {openDropdown === link.name && (
                      <div className="bg-gray-50 py-2">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.redirect}
                            href={item.redirect}
                            className="block px-4 py-2.5 pl-12 text-sm text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.redirect}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Actions (if authenticated) */}
          {isAuthenticated && user && (
            <div className="border-t border-gray-200 py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </Link>


              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;