"use client";

import { X, MessageSquare, Shield } from "lucide-react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import CitySuggestions from "./CitySuggestion";
import { useTourQuery } from "@/hooks/useTourQuery";

export default function TourQuery() {
  const {
    isOpen,
    step,
    formData,
    filteredCities,
    showSuggestions,
    selectedIndex,
    cityInputRef,
    suggestionsRef,
    createQueryMutation,
    isVerifyingCaptcha,
    handleModalOpen,
    handleSubmit,
    handleChange,
    handleCityKeyDown,
    handleCitySelect,
    canProceed,
    setIsOpen,
    setStep,
  } = useTourQuery();

  const isLoading = createQueryMutation.isPending || isVerifyingCaptcha;

  return (
    <>
      <button
        onClick={handleModalOpen}
        className="mt-6 w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
      >
        <MessageSquare className="w-5 h-5" />
        <span>Enquire Now - Get Best Price</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-linear-to-r from-orange-500 to-orange-600 text-white p-6 rounded-t-2xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tour Enquiry</h2>
                  <p className="text-orange-100 text-sm mt-1">
                    Get a personalized quote for your journey
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setStep(1);
                  }}
                  className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition"
                  disabled={isLoading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex items-center flex-1">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-all ${
                        step >= num
                          ? "bg-white text-orange-600"
                          : "bg-white/20 text-white"
                      }`}
                    >
                      {num}
                    </div>
                    {num < 4 && (
                      <div
                        className={`flex-1 h-1 mx-2 rounded transition-all ${
                          step > num ? "bg-white" : "bg-white/20"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6">
              {step === 1 && (
                <Step1 formData={formData} handleChange={handleChange} />
              )}

              {step === 2 && (
                <>
                  <Step2
                    formData={formData}
                    handleChange={handleChange}
                    cityInputRef={cityInputRef}
                    handleCityKeyDown={handleCityKeyDown}
                  />

                  <CitySuggestions
                    showSuggestions={showSuggestions}
                    filteredCities={filteredCities}
                    suggestionsRef={suggestionsRef}
                    selectedIndex={selectedIndex}
                    handleCitySelect={handleCitySelect}
                  />
                </>
              )}

              {step === 3 && (
                <Step3 formData={formData} handleChange={handleChange} />
              )}

              {step === 4 && <Step4 formData={formData} />}

              {/* Captcha Verification Status */}
              {isVerifyingCaptcha && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
                  <div className="relative">
                    <Shield className="w-5 h-5 text-blue-600 animate-pulse" />
                    <div className="absolute inset-0 animate-ping">
                      <Shield className="w-5 h-5 text-blue-400 opacity-75" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">
                      Validating CAPTCHA...
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      Verifying you &apos; re human
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    disabled={isLoading}
                    className={`cursor-pointer flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceed() || isLoading}
                  className={`cursor-pointer flex-1 px-6 py-3 font-semibold rounded-lg transition ${
                    canProceed() && !isLoading
                      ? "bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isVerifyingCaptcha
                    ? "Validating CAPTCHA..."
                    : createQueryMutation.isPending
                    ? "Submitting..."
                    : step === 4
                    ? "Submit Enquiry"
                    : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}