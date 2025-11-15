"use client";
import { useState } from "react";
import Image from "next/image";
import { ItineraryDay } from '@/types/comman';


type Props = {
  itinerary: ItineraryDay[];
};

export default function TourItinerary({ itinerary }: Props) {
  const [activeDay, setActiveDay] = useState(1);
  const activeData = itinerary.find((item) => item.day === activeDay);

  if (!itinerary?.length) return <p>No itinerary available.</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      <div className="lg:w-1/5 w-full bg-white rounded-2xl shadow-md p-5">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Itinerary</h2>

        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-transparent max-h-[550px]">
          {itinerary.map((item) => (
            <button
              key={item.day}
              onClick={() => setActiveDay(item.day)}
              className={`cursor-pointer shrink-0 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 
                ${activeDay === item.day
                  ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
            >
              DAY {item.day}
            </button>
          ))}
        </div>
      </div>

      
      <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
        <h3 className="font-semibold text-lg mb-4 border-b border-gray-200 pb-2 text-gray-800">
          Plan of Action
        </h3>

        {activeData && (
          <div className="flex flex-col md:flex-row gap-6">
            
            {activeData.plan_of_action.image_url && (
              <div className="relative w-full md:w-1/2 h-56 md:h-64 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={activeData.plan_of_action.image_url}
                  alt={activeData.plan_of_action.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            )}

            
            <div className="flex-1">
              <h4 className="text-xl font-semibold mb-2 text-gray-900">
                Day {activeData.day}: {activeData.plan_of_action.title}
              </h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {activeData.plan_of_action.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
