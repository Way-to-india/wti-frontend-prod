import Link from 'next/link';
import React from "react";
import { featuredToursData } from '@/constants/TourData';
import LandingTourCard from './LandingTourCard';

const FeaturedTours: React.FC = () => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-orange-500 text-2xl sm:text-3xl lg:text-4xl font-firaSans font-semibold">
          Featured Tours
        </h2>
      </div>
      <div className="mb-8 sm:mb-10 lg:mb-12">
        <p className="text-brand-dark text-sm sm:text-base lg:text-lg max-w-3xl">
          Discover our most popular tour packages handpicked for unforgettable adventures across India
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {featuredToursData.map((tour) => (
          <LandingTourCard key={tour.id} tour={tour} />
        ))}
      </div>

      <div className="text-center mt-10 sm:mt-12 lg:mt-16">
        <Link
          href={"/tours"}
          className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border-2 border-orange-500 text-orange-500 font-medium hover:bg-brand-gold hover:text-white hover:border-brand-gold transition-all duration-300 text-sm sm:text-base"
        >
          View All Tours
        </Link>
      </div>
    </div>
  );
};

export default FeaturedTours;