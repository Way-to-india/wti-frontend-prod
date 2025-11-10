'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { House, TramFront, Hotel, Car, Headset, ChevronDown, BookOpen } from 'lucide-react';

const navLinks = [
  { icon: House, name: "Home", redirect: "/" },
  { icon: TramFront, name: "Tours", redirect: "/india-tour-packages" },
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

const NavLinks: React.FC = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + '/');
  };

  const handleDropdownToggle = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <nav className="flex items-center gap-2 xl:gap-4">
      {navLinks.map((link) => {
        const Icon = link.icon;
        const active = isActive(link.redirect);

        if (link.hasDropdown && link.submenu) {
          return (
            <div key={link.name} className="relative" ref={dropdownRef}>
              <button
                onClick={() => handleDropdownToggle(link.name)}
                className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg font-medium text-sm transition-colors ${active
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="whitespace-nowrap">{link.name}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${openDropdown === link.name ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {openDropdown === link.name && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
                  {link.submenu.map((item) => (
                    <Link
                      key={item.redirect}
                      href={item.redirect}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                      onClick={() => setOpenDropdown(null)}
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
            className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg font-medium text-sm transition-colors whitespace-nowrap ${active
                ? 'text-orange-500 bg-orange-50'
                : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span>{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLinks;