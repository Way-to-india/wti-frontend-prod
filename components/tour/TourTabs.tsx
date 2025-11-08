'use client';

import { ItineraryDay, Tour } from '@/types/comman';
import { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';

import TourOverview from './TourOverview';
import TourItinerary from './TourItinerary';
import TourInclusions from './TourInclusions';
import TourTips from './TourTips';
import TourFAQ from './TourFAQ';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'itinerary', label: 'Itinerary Details' },
  { id: 'inclusions', label: 'Inclusions & Exclusions' },
  { id: 'tips', label: 'Travel Tips For This Tour' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
];

export default function TourTabs({
  overview,
  highlights,
  description,
  itinerary,
  inclusions,
  exclusions,
  travel_tips,
  faq,
  reviewsComponent
}: Tour & { tourId: string, reviewsComponent: React.ReactNode }) {

  const [active, setActive] = useState('overview');

  const formattedItinerary: ItineraryDay[] = itinerary;

  return (
    <div className="w-full">
     
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition cursor-pointer
                  ${active === tab.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50'
                  }`}
              >
                {tab.label}
              </button>
            ))}

           
            <Link
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap"
            >
              <FaWhatsapp className="w-5 h-5" />
              WhatsApp
            </Link>
          </div>
        </div>
      </div>

     
      <div className="container mx-auto px-4 py-8">
        {active === 'overview' && (
          <TourOverview
            overview={overview}
            highlights={highlights}
            description={description}
          />
        )}

        {active === 'itinerary' && (
          <TourItinerary itinerary={formattedItinerary} />
        )}

        {active === 'inclusions' && (
          <TourInclusions
            inclusions={inclusions}
            exclusions={exclusions}
          />
        )}

        {active === 'tips' && <TourTips tips={travel_tips} />}

        {active === 'reviews' && reviewsComponent}

        {active === 'faq' && <TourFAQ faq={faq?.faqs || []} />}
      </div>
    </div>
  );
}