'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { endPoints } from '@/constants/endpoints';
import { useAuthStore } from '@/store/AuthStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

import CitySelector from './CitySelector';
import DateSelector from './DateSelector';
import RoomsGuestsSelector from './RoomsGuestsSelector';
import PriceRange from './PriceRange';

type FormData = {
  location: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  guests: number;
  priceRange: string;
};

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const getDayAfterTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split('T')[0];
};

export default function HotelSearchForm() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    location: 'Goa',
    checkIn: getTomorrow(),
    checkOut: getDayAfterTomorrow(),
    rooms: 1,
    guests: 2,
    priceRange: 'all',
  });

  const isDateChanging = useRef(false);

  const createQueryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const payload = {
        location: data.location,
        checkInDate: data.checkIn,
        checkOutDate: data.checkOut,
        rooms: data.rooms,
        adults: data.guests,
        children: 0,
        priceRange: data.priceRange,
      };

      const response = await axios.post(endPoints.hotelQuery.create, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    },

    onSuccess: (res) => {
      toast.success(res.message || 'Query sent successfully!');
    },

    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Failed to send query');

        if (error.response?.status === 401) {
          router.push('/login');
        }
      } else {
        toast.error('Something went wrong');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error('Please login to search hotels');
      router.push('/login');
      return;
    }

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

    createQueryMutation.mutate(formData);
  };

  const handleChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'checkIn' && !isDateChanging.current) {
        const newCheckIn = new Date(value as string);
        const newCheckOut = new Date(updated.checkOut);

        if (newCheckOut <= newCheckIn) {
          newCheckOut.setDate(newCheckIn.getDate() + 1);
          updated.checkOut = newCheckOut.toISOString().split('T')[0];
        }
      }

      return updated;
    });
  };

  const isSubmitting = createQueryMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <CitySelector
          location={formData.location}
          onSelect={(city) => handleChange('location', city)}
          disabled={isSubmitting}
        />

        <DateSelector
          checkIn={formData.checkIn}
          checkOut={formData.checkOut}
          onChange={handleChange}
          disable={isSubmitting}
        />

        <RoomsGuestsSelector
          rooms={formData.rooms}
          guests={formData.guests}
          onChange={handleChange}
          disabled={isSubmitting}
        />

      </div>

      <PriceRange
        value={formData.priceRange}
        onChange={(v) => handleChange('priceRange', v)}
        disabled={isSubmitting}
      />

      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'px-12 py-4 bg-orange-600 text-white font-bold rounded-full transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-lg',
            'hover:bg-orange-700 hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer'
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
