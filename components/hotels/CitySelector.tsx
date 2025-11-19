import { useState, useRef, useEffect } from 'react';
import { FiMapPin, FiChevronDown, FiSearch, FiX } from 'react-icons/fi';
import { indianCitiesAlphabetical } from '@/utils/IndianCities';

interface Props {
  location: string;
  onSelect: (city: string) => void;
  disabled: boolean;
}

export default function CitySelector({ location, onSelect, disabled }: Props) {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [citySearchTerm, setCitySearchTerm] = useState('');

  const cityDropdownRef = useRef<HTMLDivElement>(null);
  const citySearchInputRef = useRef<HTMLInputElement>(null);

  const filteredCities = indianCitiesAlphabetical.filter(city =>
    city.toLowerCase().includes(citySearchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCityDropdown(false);
        setCitySearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showCityDropdown && citySearchInputRef.current) {
      citySearchInputRef.current.focus();
    }
  }, [showCityDropdown]);

  const handleCitySelect = (city: string) => {
    onSelect(city);
    setShowCityDropdown(false);
    setCitySearchTerm('');
  };

  return (
    <div className="relative" ref={cityDropdownRef}>
      <label className="block text-xs text-gray-500 mb-2 font-medium">
        City, Property Name Or Location
      </label>

      <div className="relative">
        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 w-5 h-5 z-10" />

        <button
          type="button"
          onClick={() => setShowCityDropdown(!showCityDropdown)}
          disabled={disabled}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl bg-white 
          hover:border-orange-400 focus:ring-2 focus:ring-orange-500 transition-all text-left 
          font-medium disabled:opacity-50"
        >
          {location}
        </button>

        <FiChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 
            pointer-events-none transition-transform ${
              showCityDropdown ? 'rotate-180' : ''
            }`}
        />
      </div>

      <p className="text-xs text-gray-500 mt-1">India</p>

      {showCityDropdown && (
        <div className="absolute top-full mt-2 w-full bg-white border-2 border-gray-200 
          rounded-xl shadow-2xl z-100 overflow-hidden"
        >
          <div className="p-3 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 
                text-gray-400 w-4 h-4"
              />

              <input
                ref={citySearchInputRef}
                type="text"
                value={citySearchTerm}
                onChange={(e) => setCitySearchTerm(e.target.value)}
                placeholder="Search cities..."
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 
                rounded-lg focus:ring-2 focus:ring-orange-500 text-sm"
              />

              {citySearchTerm && (
                <button
                  type="button"
                  onClick={() => setCitySearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredCities.length ? (
              filteredCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleCitySelect(city)}
                  className={`w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors ${
                    location === city
                      ? 'bg-orange-100 text-orange-700 font-medium'
                      : 'text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <FiMapPin
                      className={`w-4 h-4 ${
                        location === city ? 'text-orange-500' : 'text-gray-400'
                      }`}
                    />
                    {city}
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500">
                <p className="text-sm">No cities found</p>
                <p className="text-xs mt-1">Try a different search term</p>
              </div>
            )}
          </div>

          {!citySearchTerm && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2 font-medium">Popular:</p>
              <div className="flex flex-wrap gap-1.5">
                {['Goa', 'Mumbai', 'Delhi', 'Bangalore', 'Jaipur'].map(
                  (city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => handleCitySelect(city)}
                      className="px-3 py-1.5 bg-white border border-gray-300 
                      rounded-full text-xs text-gray-700 hover:bg-orange-50 
                      hover:border-orange-300 hover:text-orange-700 transition-colors"
                    >
                      {city}
                    </button>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
