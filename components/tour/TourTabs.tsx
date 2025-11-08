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
          <nav aria-label="Tour information tabs" className="flex items-center gap-3 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2
                  ${active === tab.id
                    ? 'bg-orange-600 text-white shadow-md focus:ring-orange-500'
                    : 'bg-white text-gray-800 border border-gray-300 shadow-sm hover:bg-gray-100 focus:ring-gray-400'
                  }`}
                role="tab"
                aria-selected={active === tab.id}
                aria-controls={`${tab.id}-panel`}
              >
                {tab.label}
              </button>
            ))}

            <Link
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              aria-label="Contact us on WhatsApp"
            >
              <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
              <span>WhatsApp</span>
            </Link>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {active === 'overview' && (
          <div role="tabpanel" id="overview-panel" aria-labelledby="overview-tab">
            <TourOverview
              overview={overview}
              highlights={highlights}
              description={description}
            />
          </div>
        )}

        {active === 'itinerary' && (
          <div role="tabpanel" id="itinerary-panel" aria-labelledby="itinerary-tab">
            <TourItinerary itinerary={formattedItinerary} />
          </div>
        )}

        {active === 'inclusions' && (
          <div role="tabpanel" id="inclusions-panel" aria-labelledby="inclusions-tab">
            <TourInclusions
              inclusions={inclusions}
              exclusions={exclusions}
            />
          </div>
        )}

        {active === 'tips' && (
          <div role="tabpanel" id="tips-panel" aria-labelledby="tips-tab">
            <TourTips tips={travel_tips} />
          </div>
        )}

        {active === 'reviews' && (
          <div role="tabpanel" id="reviews-panel" aria-labelledby="reviews-tab">
            {reviewsComponent}
          </div>
        )}

        {active === 'faq' && (
          <div role="tabpanel" id="faq-panel" aria-labelledby="faq-tab">
            <TourFAQ faq={faq?.faqs || []} />
          </div>
        )}
      </div>
    </div>
  );
}