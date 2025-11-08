'use client';
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Palette, Search } from 'lucide-react';

type TourSearchProps = {
  onSearch?: (params: {
    destination: string;
    startDate: string;
    endDate: string;
    theme: string;
    guests: number;
  }) => void;
};

const TourSearch: React.FC<TourSearchProps> = ({ onSearch }) => {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2025-11-08');
  const [endDate, setEndDate] = useState('2025-11-15');
  const [theme, setTheme] = useState('');
  const [guests, setGuests] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = () => {
    onSearch?.({
      destination,
      startDate,
      endDate,
      theme,
      guests,
    });
  };

  
  const formatDateRange = () => {
    if (!startDate && !endDate) return 'Select Dates';
    if (startDate && endDate) {
      const start = new Date(startDate).toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric' 
      });
      const end = new Date(endDate).toLocaleDateString('en-US', { 
        month: 'numeric', 
        day: 'numeric', 
        year: 'numeric' 
      });
      return `${start} - ${end}`;
    }
    return 'Select Dates';
  };

  return (
    <div className="w-full bg-orange-500 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        <h2 className="text-white-100 text-3xl md:text-4xl font-semibold mb-6">
          Find Your Perfect Tour
        </h2>

        
        <div className="bg-white-100 rounded-2xl p-4 md:p-6 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 items-end">
            
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-form-label flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Destination
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-4 py-3 border border-form-input-border rounded-lg text-sm text-form-input-text bg-form-input-bg focus:outline-none focus:border-form-focus-ring focus:ring-2 focus:ring-form-focus-ring/10 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5rem 1.5rem',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select Destination</option>
                <option value="paris">Paris, France</option>
                <option value="tokyo">Tokyo, Japan</option>
                <option value="new-york">New York, USA</option>
                <option value="london">London, UK</option>
                <option value="dubai">Dubai, UAE</option>
              </select>
            </div>

            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-form-label flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Travel Dates
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="w-full px-4 py-3 border border-form-input-border rounded-lg text-sm text-form-input-text bg-form-input-bg focus:outline-none focus:border-form-focus-ring focus:ring-2 focus:ring-form-focus-ring/10 transition-all text-left"
                >
                  {formatDateRange()}
                </button>
                
                
                {showDatePicker && (
                  <div className="absolute top-full left-0 mt-2 p-4 bg-white-100 border border-form-input-border rounded-lg shadow-xl z-50 min-w-[280px]">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-form-secondary-text mb-1 block">
                          Start Date
                        </label>
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-3 py-2 border border-form-input-border rounded text-sm text-form-input-text bg-form-input-bg focus:outline-none focus:border-form-focus-ring focus:ring-2 focus:ring-form-focus-ring/10"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-form-secondary-text mb-1 block">
                          End Date
                        </label>
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-3 py-2 border border-form-input-border rounded text-sm text-form-input-text bg-form-input-bg focus:outline-none focus:border-form-focus-ring focus:ring-2 focus:ring-form-focus-ring/10"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowDatePicker(false)}
                        className="w-full px-3 py-2 bg-form-button-bg text-form-button-text rounded text-sm font-medium hover:bg-form-button-hover transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-form-label flex items-center gap-2">
                <Palette className="w-5 h-5 text-orange-500" />
                Tour Theme
              </label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full px-4 py-3 border border-form-input-border rounded-lg text-sm text-form-input-text bg-form-input-bg focus:outline-none focus:border-form-focus-ring focus:ring-2 focus:ring-form-focus-ring/10 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.5rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5rem 1.5rem',
                  paddingRight: '2.5rem'
                }}
              >
                <option value="">Select Theme</option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="relaxation">Relaxation</option>
                <option value="wildlife">Wildlife</option>
                <option value="food">Food & Wine</option>
              </select>
            </div>

            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-form-label flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-500" />
                Guests
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                  className="w-full px-4 py-3 border border-form-input-border rounded-lg text-sm text-form-input-text bg-form-input-bg focus:outline-none focus:border-form-focus-ring focus:ring-2 focus:ring-form-focus-ring/10 transition-all"
                />
                <span className="absolute right-12 top-1/2 -translate-y-1/2 text-xs text-form-secondary-text">
                  Guest{guests !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-500" />
              </div>
            </div>

            
            <div className="sm:col-span-2 md:col-span-3 lg:col-span-5 xl:col-span-1">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-form-button-bg text-form-button-text rounded-lg font-medium text-sm hover:bg-form-button-hover focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <Search className="w-5 h-5" />
                Search Tours
              </button>
            </div>
          </div>
        </div>

        
        <div className="mt-4 text-white-100 text-sm md:text-base">
          We have found <span className="font-semibold">317 options</span> matching your search.{' '}
          <a href="#" className="underline hover:text-white-300 transition-colors font-medium">
            Enquiry now
          </a>{' '}
          to get customised option
        </div>
      </div>
    </div>
  );
};

export default TourSearch;