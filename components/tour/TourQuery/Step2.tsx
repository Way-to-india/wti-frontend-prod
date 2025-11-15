import { FormDataType, HandleChangeType } from '@/types/TourQuery';
import { Calendar, MapPin } from "lucide-react";

interface Step2Props {
    formData: FormDataType;
    handleChange: HandleChangeType;
    cityInputRef: React.RefObject<HTMLInputElement | null>;
    handleCityKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function Step2({
    formData,
    handleChange,
    cityInputRef,
    handleCityKeyDown,
}: Step2Props) {
    return (
        <div className="space-y-5">
            <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Travel Details
                </h3>
                <p className="text-sm text-gray-600">Tell us about your trip</p>
            </div>

            {/* Travelers */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Travelers <span className="text-red-500">*</span>
                </label>
                <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6">6 People</option>
                    <option value="7+">7+ People</option>
                </select>
            </div>

            {/* Travel Date */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Travel Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                </div>
            </div>

            {/* City */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Departure City <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                    <input
                        ref={cityInputRef}
                        type="text"
                        name="departureCity"
                        value={formData.departureCity}
                        onChange={handleChange}
                        onKeyDown={handleCityKeyDown}
                        placeholder="Enter your departure city"
                        autoComplete="off"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Start typing to see suggestions
                </p>
            </div>
        </div>
    );
}
