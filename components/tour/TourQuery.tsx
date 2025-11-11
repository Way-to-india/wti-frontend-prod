'use client';

import { useState, useRef, useMemo } from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, MessageSquare, Shield } from 'lucide-react';
import { endPoints } from '@/constants/endpoints';
import { useAuthStore } from '@/store/AuthStore';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { INDIAN_CITIES } from '@/constants/cities';

export default function TourQuery() {
  const router = useRouter();
  const { token, isAuthenticated, user } = useAuthStore();

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelers: '1',
    travelDate: '',
    departureCity: '',
    specialRequests: ''
  });

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Pre-fill form data when modal opens
  const handleModalOpen = () => {
    setIsOpen(true);

    // Pre-fill user data if authenticated
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
      }));
    }
  };

  const filteredCities = useMemo(() => {
    if (formData.departureCity.length > 0) {
      return INDIAN_CITIES.filter(city =>
        city.toLowerCase().startsWith(formData.departureCity.toLowerCase())
      ).slice(0, 6);
    }
    return [];
  }, [formData.departureCity]);

  const showSuggestions = useMemo(() => {
    return formData.departureCity.length > 0 && filteredCities.length > 0;
  }, [formData.departureCity, filteredCities.length]);

  const createQueryMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        travelers: parseInt(data.travelers),
        travelDate: data.travelDate,
        departureCity: data.departureCity,
        specialRequests: data.specialRequests || '',
      };

      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await axios.post(
        endPoints.tourQuery.create,
        payload,
        { headers }
      );
      return response.data;
    },
    onSuccess: (res) => {
      toast.success(res.message || 'Tour query sent successfully!');
      console.log('Query created:', res);

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        travelers: '1',
        travelDate: '',
        departureCity: '',
        specialRequests: ''
      });
      setStep(1);
      setIsOpen(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Failed to send query';
        toast.error(errorMessage);
      } else {
        toast.error('Something went wrong');
      }
      console.error('Error creating query:', error);
    },
  });

  const handleSubmit = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      const travelDate = new Date(formData.travelDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (travelDate < today) {
        toast.error('Travel date cannot be in the past');
        return;
      }

      createQueryMutation.mutate(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Reset selectedIndex when departure city changes
    if (name === 'departureCity') {
      setSelectedIndex(-1);
    }
  };

  const handleCitySelect = (city: string) => {
    setFormData(prev => ({
      ...prev,
      departureCity: city
    }));
    setSelectedIndex(-1);
  };

  const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < filteredCities.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && filteredCities[selectedIndex]) {
          handleCitySelect(filteredCities[selectedIndex]);
        }
        break;
      case 'Escape':
        setSelectedIndex(-1);
        cityInputRef.current?.blur();
        break;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.fullName && formData.email && formData.phone;
      case 2:
        return formData.travelers && formData.travelDate && formData.departureCity;
      case 3:
        return true;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <>
      <button
        onClick={handleModalOpen}
        className="mt-6 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Enquire Now - Get Best Price</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tour Enquiry</h2>
                  <p className="text-orange-100 text-sm mt-1">Get a personalized quote for your journey</p>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setStep(1);
                  }}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center flex-1">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-all ${step >= num
                      ? 'bg-white text-orange-600'
                      : 'bg-white/20 text-white'
                      }`}>
                      {num}
                    </div>
                    {num < 4 && (
                      <div className={`flex-1 h-1 mx-2 rounded transition-all ${step > num ? 'bg-white' : 'bg-white/20'
                        }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Personal Information</h3>
                    <p className="text-sm text-gray-600">Let us know who you are</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 9876543210"
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Travel Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Travel Details</h3>
                    <p className="text-sm text-gray-600">Tell us about your trip</p>
                  </div>

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
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                      />
                    </div>
                  </div>

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

                      {/* Autocomplete Suggestions */}
                      {showSuggestions && (
                        <div
                          ref={suggestionsRef}
                          className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
                        >
                          {filteredCities.map((city, index) => (
                            <div
                              key={city}
                              onClick={() => handleCitySelect(city)}
                              className={`px-4 py-3 cursor-pointer transition-colors flex items-center gap-2 ${index === selectedIndex
                                ? 'bg-orange-50 text-orange-600'
                                : 'hover:bg-gray-50 text-gray-700'
                                }`}
                            >
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium">{city}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Start typing to see suggestions
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Additional Information */}
              {step === 3 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">Additional Information</h3>
                    <p className="text-sm text-gray-600">Any special requirements?</p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests or Questions (Optional)
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      placeholder="Tell us about any special requirements, dietary restrictions, or questions you have..."
                      rows={6}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      {formData.specialRequests.length}/500 characters
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Verification */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                      <Shield className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Review Your Information</h3>
                    <p className="text-sm text-gray-600">Please verify all details before submitting</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Full Name:</span>
                      <span className="text-sm text-gray-900">{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Email:</span>
                      <span className="text-sm text-gray-900">{formData.email}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Phone:</span>
                      <span className="text-sm text-gray-900">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Travelers:</span>
                      <span className="text-sm text-gray-900">{formData.travelers}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">Travel Date:</span>
                      <span className="text-sm text-gray-900">{formData.travelDate}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm font-semibold text-gray-600">Departure City:</span>
                      <span className="text-sm text-gray-900">{formData.departureCity}</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <p className="text-xs text-gray-700">
                      By submitting this form, you agree to our terms and conditions. We&apos;ll contact you within 24 hours with a personalized quote.
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || createQueryMutation.isPending}
                  className={`flex-1 px-6 py-3 font-semibold rounded-lg transition ${canProceed() && !createQueryMutation.isPending
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {createQueryMutation.isPending
                    ? 'Submitting...'
                    : step === 4
                      ? 'Submit Enquiry'
                      : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}