'use client';

import type { CityItem, ThemeItem } from '@/types/comman';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ToursFiltersProps {
  cities: CityItem[];
  themes: ThemeItem[];
  currentCityId?: string;
  currentThemeId?: string;
}

export default function ToursFilters({ cities, themes, currentCityId, currentThemeId }: ToursFiltersProps) {
  const router = useRouter();

  const [showAllThemes, setShowAllThemes] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const currentValue = params.get(key);

    // Toggle filter: if same value is clicked, remove it; otherwise set it
    if (currentValue === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Reset to page 1 when filter changes
    params.set('page', '1');

    router.push(`/india-tour-packages?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/india-tour-packages');
  };

  // Ensure cities and themes are arrays
  const citiesArray = Array.isArray(cities) ? cities : [];
  const themesArray = Array.isArray(themes) ? themes : [];

  const displayedThemes = showAllThemes ? themesArray : themesArray.slice(0, 5);
  const displayedCities = showAllCities ? citiesArray : citiesArray.slice(0, 5);

  const hasActiveFilters = currentThemeId || currentCityId;

  return (
    <aside className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
     
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900"></h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-orange-600 text-sm hover:text-orange-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

     
      <div className="mb-6">
        <button
          onClick={() => setShowAllThemes(!showAllThemes)}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          <span>Tour Theme</span>
          {showAllThemes ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <div className="space-y-2">
          {displayedThemes.length > 0 ? (
            displayedThemes.map((theme) => (
              <label key={theme.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={currentThemeId === theme.id}
                  onChange={() => updateFilter('themeId', theme.id)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                  {theme.name}
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No themes available</p>
          )}
        </div>
        {themesArray.length > 5 && (
          <button
            onClick={() => setShowAllThemes(!showAllThemes)}
            className="text-orange-600 text-sm font-medium mt-2 hover:text-orange-700"
          >
            {showAllThemes ? '- Show Less' : `+ Show More (${themesArray.length - 5})`}
          </button>
        )}
      </div>

     
      <div className="mb-6">
        <button
          onClick={() => setShowAllCities(!showAllCities)}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-900 mb-3"
        >
          <span>Destination</span>
          {showAllCities ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <div className="space-y-2">
          {displayedCities.length > 0 ? (
            displayedCities.map((city) => (
              <label key={city.id} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={currentCityId === city.id}
                  onChange={() => updateFilter('cityId', city.id)}
                  className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-orange-600 transition-colors">
                  {city.name}
                </span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No cities available</p>
          )}
        </div>
        {citiesArray.length > 5 && (
          <button
            onClick={() => setShowAllCities(!showAllCities)}
            className="text-orange-600 text-sm font-medium mt-2 hover:text-orange-700"
          >
            {showAllCities ? '- Show Less' : `+ Show More (${citiesArray.length - 5})`}
          </button>
        )}
      </div>

     
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-2">Active Filters:</p>
          <div className="space-y-1">
            {currentThemeId && (
              <div className="text-xs text-gray-600">
                Theme: {themesArray.find(t => t.id === currentThemeId)?.name || currentThemeId}
              </div>
            )}
            {currentCityId && (
              <div className="text-xs text-gray-600">
                City: {citiesArray.find(c => c.id === currentCityId)?.name || currentCityId}
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}