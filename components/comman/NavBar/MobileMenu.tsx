'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/AuthStore';
import {
  Menu,
  X,
  Home,
  TramFront,
  Hotel,
  Car,
  Headset,
  BookOpen,
  ChevronDown,
  User,
  LogOut,
  Settings,
  MapPin,
  Compass,
  Lightbulb,
  Briefcase,
} from 'lucide-react';

const navLinks = [
  { icon: Home, name: "Home", redirect: "/" },
  { icon: TramFront, name: "Tours", redirect: "/india-tour-packages" },
  { icon: Hotel, name: "Hotels", redirect: "/hotels" },
  { icon: Car, name: "Transportation", redirect: "/transport" },
  {
    icon: BookOpen,
    name: "Tourist",
    redirect: "/tourist",
    hasDropdown: true,
    submenu: [
      { name: "Destinations", redirect: "/destinations", icon: MapPin },
      { name: "Travel Guide", redirect: "/travel-guide", icon: Compass },
      { name: "Travel Tips", redirect: "/travel-tips", icon: Lightbulb },
      { name: "Travel Toolkit", redirect: "/travel-toolkit", icon: Briefcase },
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
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
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
        className="p-2.5 rounded-xl hover:bg-orange-50 transition-all duration-200 active:scale-95 z-50 relative"
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9998 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar - FIXED */}
      <div
        className={`
          fixed top-0 right-0 h-screen w-[320px] max-w-[85vw] 
          bg-white shadow-2xl z-9999 
          transform transition-transform duration-300 ease-out 
          lg:hidden overflow-hidden
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-linear-to-r from-orange-50 to-white shrink-0">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo.png"
                width={130}
                height={40}
                alt="Way to India Logo"
                className="cursor-pointer"
                priority
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-white transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* User Section */}
          {isAuthenticated && user ? (
            <div className="px-4 py-4 border-b border-gray-100 bg-linear-to-br from-orange-50 via-orange-50/50 to-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-orange-500 ring-offset-2"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg shadow-lg ring-2 ring-orange-500 ring-offset-2">
                      {getUserInitials()}
                    </div>
                  )}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate mt-0.5">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-4 py-4 border-b border-gray-100 shrink-0">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-3 text-center text-sm font-semibold text-white bg-linear-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 transition-all duration-200 rounded-xl shadow-lg shadow-orange-500/30 active:scale-95"
              >
                Login / Sign Up
              </Link>
            </div>
          )}

          {/* Navigation Links - FIXED SCROLLING */}
          <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <div className="px-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.redirect);

                if (link.hasDropdown && link.submenu) {
                  return (
                    <div key={link.name} className="mb-1">
                      <button
                        onClick={() => handleDropdownToggle(link.name)}
                        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl ${active || openDropdown === link.name
                            ? 'text-orange-600 bg-orange-50'
                            : 'text-gray-700 hover:bg-gray-50'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          <span>{link.name}</span>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${openDropdown === link.name ? 'rotate-180' : ''
                            }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-200 ${openDropdown === link.name ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                      >
                        <div className="bg-gray-50/50 rounded-xl mt-1 py-1 mx-2">
                          {link.submenu.map((item) => {
                            const SubIcon = item.icon;
                            return (
                              <Link
                                key={item.redirect}
                                href={item.redirect}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-orange-600 hover:bg-white transition-all duration-200 rounded-lg"
                              >
                                <SubIcon className="w-4 h-4" />
                                <span>{item.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.redirect}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 rounded-xl mb-1 ${active
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* User Actions */}
          {isAuthenticated && user && (
            <div className="border-t border-gray-100 py-2 px-2 bg-gray-50/50 shrink-0">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-white hover:text-orange-600 transition-all duration-200 rounded-xl mb-1"
              >
                <User className="w-5 h-5" />
                <span>My Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all duration-200 rounded-xl"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}; 

export default MobileMenu;