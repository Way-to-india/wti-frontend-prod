'use client';

import { useState, useRef } from 'react';
import { FiMapPin, FiChevronDown } from 'react-icons/fi';
import { cn } from '@/lib/utils';

type FormData = {
    location: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
    priceRange: string;
};

export default function HotelSearchForm() {
    const [formData, setFormData] = useState<FormData>({
        location: 'Goa',
        checkIn: '2025-11-08',
        checkOut: '2025-11-09',
        rooms: 1,
        guests: 2,
        priceRange: 'all',
    });

    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const checkInRef = useRef<HTMLInputElement>(null);
    const checkOutRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Search query:', formData);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof FormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        return { day, month, year, dayName };
    };

    const checkInDate = formatDate(formData.checkIn);
    const checkOutDate = formatDate(formData.checkOut);

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Location */}
                <div className="relative">
                    <label className="block text-xs text-gray-500 mb-2 font-medium">
                        City, Property Name Or Location
                    </label>
                    <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={formData.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 appearance-none bg-white cursor-pointer"
                        >
                            <option value="Goa">Goa</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Kerala">Kerala</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">India</p>
                </div>

                {/* Check-In */}
                <div>
                    <label className="block text-xs text-gray-500 mb-2 font-medium">
                        Check-In 📅
                    </label>
                    <input
                        type="date"
                        ref={checkInRef}
                        value={formData.checkIn}
                        onChange={(e) => handleChange('checkIn', e.target.value)}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => checkInRef.current?.showPicker?.()}
                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500"
                    >
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{checkInDate.day}</span>
                            <span className="text-sm">{checkInDate.month}&apos;{checkInDate.year}</span>
                        </div>
                        <p className="text-xs text-gray-500">{checkInDate.dayName}</p>
                    </button>
                </div>

                {/* Check-Out */}
                <div>
                    <label className="block text-xs text-gray-500 mb-2 font-medium">
                        Check-Out 📅
                    </label>
                    <input
                        type="date"
                        ref={checkOutRef}
                        value={formData.checkOut}
                        onChange={(e) => handleChange('checkOut', e.target.value)}
                        min={formData.checkIn}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => checkOutRef.current?.showPicker?.()}
                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500"
                    >
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold">{checkOutDate.day}</span>
                            <span className="text-sm">{checkOutDate.month}&apos;{checkOutDate.year}</span>
                        </div>
                        <p className="text-xs text-gray-500">{checkOutDate.dayName}</p>
                    </button>
                </div>

                {/* Rooms & Guests */}
                <div className="relative">
                    <label className="block text-xs text-gray-500 mb-2 font-medium">
                        Rooms & Guests 👥
                    </label>
                    <button
                        type="button"
                        onClick={() => setShowGuestsDropdown(!showGuestsDropdown)}
                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500"
                    >
                        <div className="flex items-baseline gap-3">
                            <div>
                                <span className="text-3xl font-bold">{formData.rooms}</span>
                                <span className="text-sm ml-1">Room</span>
                            </div>
                            <div>
                                <span className="text-3xl font-bold">{formData.guests}</span>
                                <span className="text-sm ml-1">Guests</span>
                            </div>
                        </div>
                    </button>

                    {showGuestsDropdown && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Rooms</span>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => handleChange('rooms', Math.max(1, formData.rooms - 1))} className="w-8 h-8 bg-gray-100 rounded-full">−</button>
                                        <span className="w-8 text-center font-semibold">{formData.rooms}</span>
                                        <button type="button" onClick={() => handleChange('rooms', formData.rooms + 1)} className="w-8 h-8 bg-gray-100 rounded-full">+</button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Guests</span>
                                    <div className="flex items-center gap-3">
                                        <button type="button" onClick={() => handleChange('guests', Math.max(1, formData.guests - 1))} className="w-8 h-8 bg-gray-100 rounded-full">−</button>
                                        <span className="w-8 text-center font-semibold">{formData.guests}</span>
                                        <button type="button" onClick={() => handleChange('guests', formData.guests + 1)} className="w-8 h-8 bg-gray-100 rounded-full">+</button>
                                    </div>
                                </div>
                            </div>
                            <button type="button" onClick={() => setShowGuestsDropdown(false)} className="w-full mt-4 py-2 bg-orange-600 text-white rounded-lg">
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Price */}
            <div className="flex justify-end items-center">
                <label className="text-sm mr-3">Price Per Night</label>
                <select
                    value={formData.priceRange}
                    onChange={(e) => handleChange('priceRange', e.target.value)}
                    className="px-4 py-2 border rounded-lg text-sm"
                >
                    <option value="all">All Prices</option>
                    <option value="budget">Under ₹2,000</option>
                    <option value="mid">₹2,000 - ₹5,000</option>
                    <option value="luxury">₹5,000+</option>
                </select>
            </div>

            <div className="flex justify-center pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        "px-12 py-4 bg-orange-600 text-white font-bold rounded-full transition shadow-lg disabled:opacity-50 text-lg",
                        "hover:bg-orange-700 hover:shadow-xl transform hover:scale-105 active:scale-95"
                    )}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Searching...
                        </span>
                    ) : (
                        'SEND QUERY'
                    )}
                </button>
            </div>
        </form>
    );
}
