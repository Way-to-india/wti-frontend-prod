import { Suspense } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserAuth from "./UserAuth";
import MobileMenu from "./MobileMenu";
import Loader from '@/components/skeleton/Loader';

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 border-b border-gray-200 overflow-hidden ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <Suspense fallback={<Loader className='mt-30' />}>
              <NavLinks />
            </Suspense>

            <Suspense fallback={<Loader className='mt-30' />}>
              <UserAuth />
            </Suspense>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Suspense fallback={<Loader className='mt-30' />}>
              <MobileMenu />
            </Suspense>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;