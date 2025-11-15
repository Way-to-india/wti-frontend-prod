import { useState, useRef, useMemo } from "react";
import { endPoints } from "@/constants/endpoints";
import { useAuthStore } from "@/store/AuthStore";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { INDIAN_CITIES } from "@/constants/cities";
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useTourQuery = () => {
    const { token, isAuthenticated, user } = useAuthStore();
    const { executeRecaptcha } = useGoogleReCaptcha();

    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isVerifyingCaptcha, setIsVerifyingCaptcha] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        travelers: "1",
        travelDate: "",
        departureCity: "",
        specialRequests: "",
    });

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const cityInputRef = useRef<HTMLInputElement | null>(null);
    const suggestionsRef = useRef<HTMLDivElement | null>(null);

    const handleModalOpen = () => {
        setIsOpen(true);

        if (isAuthenticated && user) {
            setFormData((prev) => ({
                ...prev,
                fullName: user.name || prev.fullName,
                email: user.email || prev.email,
            }));
        }
    };

    const filteredCities = useMemo(() => {
        if (formData.departureCity.length > 0) {
            return INDIAN_CITIES.filter((city) =>
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
            // Get reCAPTCHA token
            if (!executeRecaptcha) {
                throw new Error('reCAPTCHA not available');
            }

            setIsVerifyingCaptcha(true);

            try {
                const recaptchaToken = await executeRecaptcha('tour_query_submit');

                const payload = {
                    fullName: data.fullName,
                    email: data.email,
                    phone: data.phone,
                    travelers: data.travelers === "7+" ? 7 : parseInt(data.travelers),
                    travelDate: data.travelDate,
                    departureCity: data.departureCity.trim(),
                    specialRequests: data.specialRequests || "",
                    recaptchaToken, // Add reCAPTCHA token to payload
                };

                const headers: Record<string, string> = {
                    "Content-Type": "application/json",
                };

                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const response = await axios.post(endPoints.tourQuery.create, payload, {
                    headers,
                });

                return response.data;
            } finally {
                setIsVerifyingCaptcha(false);
            }
        },

        onSuccess: (res) => {
            toast.success(res.message || "Tour query sent successfully!");

            setFormData({
                fullName: "",
                email: "",
                phone: "",
                travelers: "1",
                travelDate: "",
                departureCity: "",
                specialRequests: "",
            });

            setStep(1);
            setIsOpen(false);
        },

        onError: (error) => {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.message || "Failed to send query";
                toast.error(errorMessage);
            } else {
                toast.error("Something went wrong");
            }
        },
    });

    const handleSubmit = async () => {
        if (step < 4) {
            setStep(step + 1);
            return;
        }

        const travelDate = new Date(formData.travelDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (travelDate < today) {
            toast.error("Travel date cannot be in the past");
            return;
        }

        // Check if reCAPTCHA is available
        if (!executeRecaptcha) {
            toast.error("reCAPTCHA not loaded. Please refresh the page.");
            return;
        }

        createQueryMutation.mutate(formData);
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "departureCity") {
            setSelectedIndex(-1);
        }
    };

    const handleCitySelect = (city: string) => {
        setFormData((prev) => ({
            ...prev,
            departureCity: city,
        }));
        setSelectedIndex(-1);
        cityInputRef.current?.blur();
    };

    const handleCityKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showSuggestions) return;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex((prev) =>
                    prev < filteredCities.length - 1 ? prev + 1 : prev
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
                break;

            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && filteredCities[selectedIndex]) {
                    handleCitySelect(filteredCities[selectedIndex]);
                }
                break;

            case "Escape":
                setSelectedIndex(-1);
                cityInputRef.current?.blur();
                break;
        }
    };

    const canProceed = () => {
        switch (step) {
            case 1:
                return (
                    formData.fullName.trim().length > 0 &&
                    formData.email.trim().length > 0 &&
                    formData.phone.trim().length > 0
                );
            case 2:
                return (
                    formData.travelers &&
                    formData.travelDate &&
                    formData.departureCity.trim().length > 0
                );
            default:
                return true;
        }
    };

    return {
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
    };
};