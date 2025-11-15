import Image from "next/image";
import HeroImage from "@/assets/hero.jpeg";
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative h-screen w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImage}
          alt="Travel destination background"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Come, Explore the
            <span className="block mt-2 text-orange-600">
              Incredible Land
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto px-4">
            Discover breathtaking destinations, create unforgettable memories
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/india-tour-packages">
            <button
              type="button"
              className={cn(
                "px-10 py-4 sm:px-12 sm:py-5 bg-orange-600 text-white font-bold rounded-full transition-all shadow-lg text-base sm:text-lg",
                "hover:bg-orange-700 hover:shadow-2xl transform hover:scale-105 active:scale-95"
              )}
            >
              Explore Tours
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;