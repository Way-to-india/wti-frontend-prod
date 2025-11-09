'use client';

import { useState, useMemo } from 'react';
import { DestinationState } from '@/types/comman';
import { FiSearch, FiX } from 'react-icons/fi';
import AccordionItem from './AccordianItem';

interface Props {
  states: DestinationState[];
}

const SearchFilter = ({ states }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStates = useMemo(() => {
    if (!searchTerm.trim()) {
      return states;
    }

    const search = searchTerm.toLowerCase();

    return states
      .map((state) => {
        const stateMatches = state.name.toLowerCase().includes(search);

        const filteredCities = state.cities?.filter((city) =>
          city.name.toLowerCase().includes(search)
        );

        if (stateMatches || (filteredCities && filteredCities.length > 0)) {
          return {
            ...state,
            cities: stateMatches ? state.cities : filteredCities,
          };
        }

        return null;
      })
      .filter((state) => state !== null) as DestinationState[];
  }, [states, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      
      <div className="relative mb-8">
        <div className="relative">
          <FiSearch 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" 
            aria-hidden="true" 
          />
          <input
            type="text"
            placeholder="Search for states or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-12 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition text-lg"
            aria-label="Search states and cities"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              aria-label="Clear search"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>

        
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-600 text-center">
            {filteredStates.length === 0 ? (
              <span className="text-red-600 font-medium">
                No results found for {searchTerm}
              </span>
            ) : (
              <span>
                Found <span className="font-semibold text-orange-600">{filteredStates.length}</span> {filteredStates.length === 1 ? 'state' : 'states'}
              </span>
            )}
          </div>
        )}
      </div>

      
      <div className="space-y-4">
        {filteredStates.length > 0 ? (
          filteredStates.map((state) => (
            <AccordionItem key={state.id} state={state} />
          ))
        ) : searchTerm ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-600 mb-4">
              Try searching with different keywords
            </p>
            <button
              onClick={clearSearch}
              className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition font-medium"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-600">No states available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;