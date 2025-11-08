import { Suspense } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserAuth from "./UserAuth";
import Loader from '@/components/skeleton/Loader';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          <Suspense fallback={<Loader/>}>
            <NavLinks />
          </Suspense>

          <Suspense fallback={<Loader/>}>
            <UserAuth />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
