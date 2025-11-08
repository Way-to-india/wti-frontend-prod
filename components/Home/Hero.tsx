import Image from "next/image";
import HeroImage from "@/assets/hero.jpeg";

const Hero = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={HeroImage}
          alt="Travel destination background"
          fill
          priority
          quality={75}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-white/40"></div>

      {/* <div className="relative z-10 container mx-auto px-4 pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20">

        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Come, Explore the
            <span className="block mt-2 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Incredible Land
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover breathtaking destinations, create unforgettable memories
          </p>
        </div>
        <div
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/20"
          role="tabpanel"
        >
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
