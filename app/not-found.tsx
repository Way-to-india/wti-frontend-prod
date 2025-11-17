'use client';

import { Home, ArrowLeft, Compass } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-[200px] md:text-[280px] font-black text-transparent bg-clip-text bg-linear-to-r from-orange-500 via-orange-600 to-orange-500 leading-none select-none">
              404
            </h1>
            
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Compass className="w-24 h-24 md:w-32 md:h-32 text-orange-500/30" />
            </div>
          </div>
        </div>

        
        <div className="space-y-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/">
            <button className="group bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3">
              <Home className="w-5 h-5" />
              <span>Go Back Home</span>
            </button>
          </Link>

          <button
            onClick={handleGoBack}
            className="group bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-3 border border-gray-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        
        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-orange-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Quick Links
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: 'Home', path: '/' },
              { label: 'Tours', path: '/tours' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map((link, index) => (
              <Link key={index} href={link.path}>
                <button className="px-6 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium rounded-lg transition-colors">
                  {link.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}