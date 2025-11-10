
'use client';

import { useState } from 'react';
import { DestinationState } from '@/types/comman';
import { FiMapPin, FiChevronDown } from 'react-icons/fi';
import { MdLocationCity } from 'react-icons/md';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Props {
  state: DestinationState;
}

const AccordionItem = ({ state }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cusor-pointer bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${state.id}`}
      >
        <div className="flex items-center gap-4">
          
          <div className="bg-orange-100 p-3 rounded-lg">
            <FiMapPin className="w-6 h-6 text-orange-600" aria-hidden="true" />
          </div>

          
          <div className="text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {state.name}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <MdLocationCity className="w-4 h-4" aria-hidden="true" />
                {state.cityCount} cities
              </span>
              <span className="text-gray-400">•</span>
              <span>{state.monumentCount} monuments</span>
            </div>
          </div>
        </div>

        
        <div className={cn(
          "transition-transform duration-200",
          isOpen && "rotate-180"
        )}>
          <FiChevronDown className="w-6 h-6 text-gray-600" aria-hidden="true" />
        </div>
      </button>

      
      <div
        id={`accordion-content-${state.id}`}
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {state.cities && state.cities.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {state?.cities.map((city) => (
                <Link
                  key={city.id}
                  href={`/destinations/${state.slug}/${city.slug}`}
                  className="group flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-400 hover:shadow-md transition-all"
                >
                  
                  <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
                    <MdLocationCity className="w-5 h-5 text-gray-600 group-hover:text-orange-600 transition-colors" aria-hidden="true" />
                  </div>

                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-1 truncate">
                      {city.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {city.monumentCount} {city.monumentCount === 1 ? 'place' : 'places'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No cities available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;