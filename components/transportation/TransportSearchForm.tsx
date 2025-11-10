'use client';

import { useState } from 'react';
import { FiMapPin, FiRepeat } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import { endPoints } from '@/constants/endpoints';
import { useAuthStore } from '@/store/AuthStore';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type FormData = {
  from: string;
  to: string;
  departure: string;
  return: string;
  pickupTime: string;
  timeFormat: 'AM' | 'PM';
};

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Jaipur',
  'Goa', 'Agra', 'Mysore', 'Udaipur', 'Kerala'
];

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};


export default function TransportSearchForm() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();

  const [formData, setFormData] = useState<FormData>({
    from: 'Mumbai',
    to: 'Pune',
    departure: getTomorrow(),
    return: '',
    pickupTime: '10:00',
    timeFormat: 'AM',
  });

  const createQueryMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (!token) {
        throw new Error('Authentication required');
      }

      
      let hour = parseInt(data.pickupTime.split(':')[0]);
      const minute = data.pickupTime.split(':')[1];

      if (data.timeFormat === 'PM' && hour !== 12) {
        hour += 12;
      } else if (data.timeFormat === 'AM' && hour === 12) {
        hour = 0;
      }

      const pickupTime24 = `${hour.toString().padStart(2, '0')}:${minute}`;

      
      const payload = {
        from: data.from,
        to: data.to,
        departureDate: data.departure,
        returnDate: data.return || null,
        pickupTime: pickupTime24,
      };

      const response = await axios.post(
        endPoints.transportQuery.create,
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
      toast.success(res.message || 'Transport query sent successfully!');
      console.log('Transport query created:', res);
      
      
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to send query';
        toast.error(errorMessage);

        
        if (error.response?.status === 401) {
          toast.error('Please login to continue');
          router.push('/login');
        }
      } else {
        toast.error('Something went wrong');
      }
      console.error('Error creating transport query:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!isAuthenticated) {
      toast.error('Please login to search transport');
      router.push('/login');
      return;
    }

    
    if (formData.from === formData.to) {
      toast.error('From and To locations cannot be the same');
      return;
    }

    
    const departure = new Date(formData.departure);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (departure < today) {
      toast.error('Departure date cannot be in the past');
      return;
    }

    
    if (formData.return) {
      const returnDate = new Date(formData.return);
      if (returnDate < departure) {
        toast.error('Return date must be after departure date');
        return;
      }
    }

    
    createQueryMutation.mutate(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // If departure changes & return becomes earlier => reset return
      if (field === 'departure' && updated.return) {
        const dep = new Date(updated.departure);
        const ret = new Date(updated.return);
        if (ret < dep) {
          updated.return = '';
        }
      }

      return updated;
    });
  };


  const swapLocations = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  
  const formatDate = (dateString: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear().toString().slice(-2),
      dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
    };
  };

  const departureDate = formatDate(formData.departure);
  const returnDate = formData.return ? formatDate(formData.return) : null;
  const isSubmitting = createQueryMutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* From and To */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-start">
        {/* From */}
        <div>
          <label htmlFor="from" className="block text-sm text-gray-600 mb-2 font-medium">
            From
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <select
              id="from"
              value={formData.from}
              onChange={(e) => handleChange('from', e.target.value)}
              disabled={isSubmitting}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition appearance-none bg-white text-2xl font-bold text-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cities?.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex items-end justify-center pb-2 md:pb-4">
          <button
            type="button"
            onClick={swapLocations}
            disabled={isSubmitting}
            className="p-3 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            aria-label="Swap locations"
            title="Swap from and to"
          >
            <FiRepeat className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* To */}
        <div>
          <label htmlFor="to" className="block text-sm text-gray-600 mb-2 font-medium">
            To
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" aria-hidden="true" />
            <select
              id="to"
              value={formData.to}
              onChange={(e) => handleChange('to', e.target.value)}
              disabled={isSubmitting}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition appearance-none bg-white text-2xl font-bold text-gray-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Add Stops Feature */}
      <div>
        <button
          type="button"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium transition disabled:opacity-50"
        >
          <span className="text-lg">+</span>
          <span>Add Stops</span>
          <span className="px-2 py-0.5 bg-pink-100 text-pink-600 text-xs rounded-full font-semibold">
            new
          </span>
        </button>
      </div>

      {/* Departure, Return, Pickup Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Departure */}
        <div>
          <label htmlFor="departure" className="block text-sm text-gray-600 mb-2 font-medium">
            Departure 📅
          </label>
          <input
            type="date"
            id="departure"
            name="departure"
            value={formData.departure}
            onChange={(e) => handleChange('departure', e.target.value)}
            disabled={isSubmitting}
            className="hidden"
            min={getTomorrow()}   
          />
          <button
            type="button"
            onClick={() => (document.getElementById('departure') as HTMLInputElement)?.showPicker?.()}
            disabled={isSubmitting}
            className="w-full text-left px-4 py-4 border-2 border-gray-300 rounded-xl hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {departureDate && (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{departureDate.day}</span>
                  <span className="text-sm text-gray-600">
                    {departureDate.month}&apos;{departureDate.year}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{departureDate.dayName}</p>
              </>
            )}
          </button>
        </div>

        {/* Return */}
        <div>
          <label htmlFor="return" className="block text-sm text-gray-600 mb-2 font-medium">
            Return 📅
          </label>
          <input
            type="date"
            id="return"
            name="return"
            value={formData.return}
            onChange={(e) => handleChange('return', e.target.value)}
            disabled={isSubmitting}
            className="hidden"
            min={formData.departure} 
          />
          <button
            type="button"
            onClick={() => (document.getElementById('return') as HTMLInputElement)?.showPicker?.()}
            disabled={isSubmitting}
            className="w-full text-left px-4 py-4 border-2 border-gray-300 rounded-xl hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {returnDate ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">{returnDate.day}</span>
                  <span className="text-sm text-gray-600">
                    {returnDate.month}&apos;{returnDate.year}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{returnDate.dayName}</p>
              </>
            ) : (
              <div className="text-gray-400 text-sm">Tap to add return date</div>
            )}
          </button>
        </div>

        {/* Pickup Time */}
        <div>
          <label htmlFor="pickupTime" className="block text-sm text-gray-600 mb-2 font-medium">
            Pickup Time ⏰
          </label>
          <div className="flex gap-2">
            <input
              type="time"
              id="pickupTime"
              value={formData.pickupTime}
              onChange={(e) => handleChange('pickupTime', e.target.value)}
              disabled={isSubmitting}
              className="flex-1 px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-2xl font-bold text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => handleChange('timeFormat', 'AM')}
                disabled={isSubmitting}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50',
                  formData.timeFormat === 'AM'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => handleChange('timeFormat', 'PM')}
                disabled={isSubmitting}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition disabled:opacity-50',
                  formData.timeFormat === 'PM'
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                )}
              >
                PM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "px-16 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-lg",
            "transform hover:scale-105 active:scale-95"
          )}
          aria-label="Send search query"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-3">
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