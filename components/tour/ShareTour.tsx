"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShare2, FiCheck } from 'react-icons/fi';

const ShareTour = ({
    tour,
}: {
    tour: { title: string; duration: { days: number; nights: number } };
}) => {
    const [showShareToast, setShowShareToast] = useState(false);

    const handleShare = async () => {
        const shareData = {
            title: tour.title,
            text: `Check out this amazing tour: ${tour.title} - ${tour.duration.nights} Nights / ${tour.duration.days} Days`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(window.location.href);
                setShowShareToast(true);
                setTimeout(() => setShowShareToast(false), 3000);
            }
        } catch (err) {
            // Only fallback to clipboard if user didn't cancel the share dialog
            if (err instanceof Error && err.name !== 'AbortError') {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    setShowShareToast(true);
                    setTimeout(() => setShowShareToast(false), 3000);
                } catch (clipboardErr) {
                    console.error('Failed to share:', clipboardErr);
                }
            }
        }
    };

    return (
        <>
            <button
                onClick={handleShare}
                className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                aria-label="Share this tour"
                title="Share this tour"
            >
                <FiShare2 className="w-4 h-4" aria-hidden="true" />
            </button>

            {/* Toast Notification */}
            <AnimatePresence>
                {showShareToast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
                    >
                        <FiCheck className="w-5 h-5" aria-hidden="true" />
                        <span className="text-sm font-medium">Link copied to clipboard!</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ShareTour;