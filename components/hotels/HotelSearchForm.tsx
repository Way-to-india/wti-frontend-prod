'use client';

import { useState, useRef } from 'react';
import { FiMapPin, FiChevronDown } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { endPoints } from '@/constants/endpoints';
import { useAuthStore } from '@/store/AuthStore';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type FormData = {
    location: string;
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
    priceRange: string;
};

// Helper function to get today's date
const getTodayDate = () => {
    if (typeof window === 'undefined') return ''; // Return empty on server
    return new Date().toISOString().split('T')[0];
};

export default function HotelSearchForm() {
    const router = useRouter();
    const { token, isAuthenticated } = useAuthStore();

    const [formData, setFormData] = useState<FormData>({
        location: 'Goa',
        checkIn: '2025-11-08',
        checkOut: '2025-11-09',
        rooms: 1,
        guests: 2,
        priceRange: 'all',
    });

    const [showGuestsDropdown, setShowGuestsDropdown] = useState(false);
    const checkInRef = useRef<HTMLInputElement>(null);
    const checkOutRef = useRef<HTMLInputElement>(null);

    // Mutation for creating hotel query
    const createQueryMutation = useMutation({
        mutationFn: async (data: FormData) => {
            if (!token) {
                throw new Error('Authentication required');
            }

            // Map frontend field names to backend field names
            const payload = {
                location: data.location,
                checkInDate: data.checkIn,  // Backend expects checkInDate
                checkOutDate: data.checkOut, // Backend expects checkOutDate
                rooms: data.rooms,
                adults: data.guests,         // Backend expects adults
                children: 0,                 // Optional field, defaulting to 0
                priceRange: data.priceRange,
            };

            const response = await axios.post(
                endPoints.hotelQuery.create,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            return response.data;
        },
        onSuccess: (res) => {
            toast.success(res.message || 'Query sent successfully!');
            console.log('Query created:', res);
            // Optionally redirect to results page or query details
            // router.push(`/queries/${res.payload.id}`);
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || 'Failed to send query';
                toast.error(errorMessage);

                // If unauthorized, redirect to login
                if (error.response?.status === 401) {
                    toast.error('Please login to continue');
                    router.push('/login');
                }
            } else {
                toast.error('Something went wrong');
            }
            console.error('Error creating query:', error);
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if user is authenticated
        if (!isAuthenticated) {
            toast.error('Please login to search hotels');
            router.push('/login');
            return;
        }

        // Validate dates
        const checkIn = new Date(formData.checkIn);
        const checkOut = new Date(formData.checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (checkIn < today) {
            toast.error('Check-in date cannot be in the past');
            return;
        }

        if (checkOut <= checkIn) {
            toast.error('Check-out date must be after check-in date');
            return;
        }

        // Submit the query
        createQueryMutation.mutate(formData);
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
    const isSubmitting = createQueryMutation.isPending;

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location Select */}
                <div className="relative">
                    <label className="block text-xs text-gray-500 mb-2 font-medium">
                        City, Property Name Or Location
                    </label>
                    <div className="relative">
                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={formData.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                            disabled={isSubmitting}
                            className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 appearance-none bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="Goa">Goa</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Jaipur">Jaipur</option>
                            <option value="Kerala">Kerala</option>
                        </select>
                        <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
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
                        name="checkIn"
                        ref={checkInRef}
                        value={formData.checkIn}
                        onChange={(e) => handleChange('checkIn', e.target.value)}
                        disabled={isSubmitting}
                        tabIndex={-1}
                        className="sr-only"
                    />
                    <button
                        type="button"
                        onClick={() => checkInRef.current?.showPicker?.()}
                        disabled={isSubmitting}
                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        name="checkOut"
                        ref={checkOutRef}
                        value={formData.checkOut}
                        onChange={(e) => handleChange('checkOut', e.target.value)}
                        disabled={isSubmitting}
                        tabIndex={-1}
                        className="sr-only"
                    />
                    <button
                        type="button"
                        onClick={() => checkOutRef.current?.showPicker?.()}
                        disabled={isSubmitting}
                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
                        disabled={isSubmitting}
                        className="w-full text-left px-4 py-3 border border-gray-300 rounded-xl bg-white hover:border-orange-400 focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <div className="flex items-baseline gap-3">
                            <div>
                                <span className="text-3xl font-bold">{formData.rooms}</span>
                                <span className="text-sm ml-1">Room{formData.rooms > 1 ? 's' : ''}</span>
                            </div>
                            <div>
                                <span className="text-3xl font-bold">{formData.guests}</span>
                                <span className="text-sm ml-1">Guest{formData.guests > 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </button>

                    {showGuestsDropdown && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl p-4 z-50">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Rooms</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleChange('rooms', Math.max(1, formData.rooms - 1))}
                                            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center font-semibold">{formData.rooms}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleChange('rooms', Math.min(10, formData.rooms + 1))}
                                            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">Guests</span>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => handleChange('guests', Math.max(1, formData.guests - 1))}
                                            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center font-semibold">{formData.guests}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleChange('guests', Math.min(20, formData.guests + 1))}
                                            className="w-8 h-8 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowGuestsDropdown(false)}
                                className="w-full mt-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
                            >
                                Done
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Price Range */}
            <div className="flex justify-end items-center">
                <label className="text-sm mr-3 text-gray-700">Price Per Night</label>
                <select
                    value={formData.priceRange}
                    onChange={(e) => handleChange('priceRange', e.target.value)}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="all">All Prices</option>
                    <option value="budget">Under ₹2,000</option>
                    <option value="mid">₹2,000 - ₹5,000</option>
                    <option value="luxury">₹5,000+</option>
                </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                        "px-12 py-4 bg-orange-600 text-white font-bold rounded-full transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg",
                        "hover:bg-orange-700 hover:shadow-xl transform hover:scale-105 active:scale-95"
                    )}
                >
                    {isSubmitting ? (
                        <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending Query...
                        </span>
                    ) : (
                        'SEND QUERY'
                    )}
                </button>
            </div>
        </form>
    );
}