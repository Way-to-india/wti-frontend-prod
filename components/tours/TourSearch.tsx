'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MapPin, Palette, Search } from 'lucide-react';
import { ThemeItem, CityItem } from '@/types/comman';

interface TourSearchProps {
  cities: CityItem[];
  themes: ThemeItem[];
}

export default function TourSearch({ cities, themes }: TourSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Derive state directly from URL - no local state needed
  const selectedCityId = searchParams.get('cityId') || '';
  const selectedThemeId = searchParams.get('themeId') || '';

  const handleSearch = () => {
    const params = new URLSearchParams();

    // Backend expects cityId and themeId
    if (selectedCityId) params.set('cityId', selectedCityId);
    if (selectedThemeId) params.set('themeId', selectedThemeId);
    params.set('page', '1');

    router.push(`/india-tour-packages?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push('/india-tour-packages');
  };

  const handleRemoveFilter = (field: 'cityId' | 'themeId') => {
    const params = new URLSearchParams(searchParams.toString());

    if (field === 'cityId') {
      params.delete('cityId');
    } else {
      params.delete('themeId');
    }

    params.set('page', '1');
    router.push(`/india-tour-packages?${params.toString()}`);
  };

  const handleCityChange = (cityId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (cityId) {
      params.set('cityId', cityId);
    } else {
      params.delete('cityId');
    }
    params.set('page', '1');

    router.push(`/india-tour-packages?${params.toString()}`);
  };

  const handleThemeChange = (themeId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (themeId) {
      params.set('themeId', themeId);
    } else {
      params.delete('themeId');
    }
    params.set('page', '1');

    router.push(`/india-tour-packages?${params.toString()}`);
  };

  const hasActiveFilters = selectedCityId || selectedThemeId;

  // Ensure cities and themes are arrays
  const citiesArray = Array.isArray(cities) ? cities : [];
  const themesArray = Array.isArray(themes) ? themes : [];

  return (
    <div className="w-full bg-linear-to-r from-orange-500 to-orange-600 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-3xl md:text-4xl font-semibold">
            Find Your Perfect Tour
          </h2>
          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="text-white/90 hover:text-white text-sm underline transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">

            {/* DESTINATION DROPDOWN */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Destination
              </label>
              <select
                value={selectedCityId}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all appearance-none cursor-pointer hover:border-orange-300"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.25rem 1.25rem',
                  paddingRight: '3rem'
                }}
              >
                <option value="">All Destinations</option>
                {citiesArray.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TOUR THEME DROPDOWN */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Palette className="w-4 h-4 text-orange-500" />
                Tour Theme
              </label>
              <select
                value={selectedThemeId}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-900 bg-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all appearance-none cursor-pointer hover:border-orange-300"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f97316' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.25rem 1.25rem',
                  paddingRight: '3rem'
                }}
              >
                <option value="">All Themes</option>
                {themesArray.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-linear-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold text-sm hover:from-orange-700 hover:to-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Search className="w-5 h-5" />
                Search Tours
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                {selectedCityId && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    📍 {citiesArray.find(c => c.id === selectedCityId)?.name || selectedCityId}
                    <button
                      onClick={() => handleRemoveFilter('cityId')}
                      className="ml-1 hover:text-orange-900"
                      aria-label="Remove city filter"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedThemeId && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                    🎨 {themesArray.find(t => t.id === selectedThemeId)?.name || selectedThemeId}
                    <button
                      onClick={() => handleRemoveFilter('themeId')}
                      className="ml-1 hover:text-orange-900"
                      aria-label="Remove theme filter"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}