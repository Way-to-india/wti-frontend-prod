import { MapPin } from "lucide-react";

interface CitySuggestionsProps {
    showSuggestions: boolean;
    filteredCities: string[];
    suggestionsRef: React.RefObject<HTMLDivElement | null>;
    selectedIndex: number;
    handleCitySelect: (city: string) => void;
}

export default function CitySuggestions({
  showSuggestions,
  filteredCities,
  suggestionsRef,
  selectedIndex,
  handleCitySelect,
}: CitySuggestionsProps) {
  if (!showSuggestions) return null;

  return (
<div
  ref={suggestionsRef}
  className={`absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto z-20 ${
    showSuggestions ? "block" : "hidden"
  }`}
>
      {filteredCities.map((city: string, index: number) => (
        <div
          key={city}
          onClick={() => handleCitySelect(city)}
          className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-2 ${
            index === selectedIndex
              ? "bg-orange-50 text-orange-600"
              : "hover:bg-gray-50 text-gray-700"
          }`}
        >
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium">{city}</span>
        </div>
      ))}
    </div>
  );
}
