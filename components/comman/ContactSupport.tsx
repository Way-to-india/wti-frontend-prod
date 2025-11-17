"use client";

import { handleWhatsAppRedirect } from '@/utils/WhatsappRedirect';
import { FaWhatsapp } from 'react-icons/fa';

const ContactSupport = ({ title }: { title: string }) => {
    console.log("title",title);
    return (
        <div className="mt-10 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Need Help with Your Booking?</h4>
                    <p className="text-sm text-gray-600">
                        Our support team is available 24/7 to assist you with any questions or concerns.
                    </p>
                </div>

                <div
                    onClick={() => handleWhatsAppRedirect(title)}
                    rel="noopener noreferrer"
                    className="cursor-pointer ml-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Contact us on WhatsApp"
                >
                    <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
                    <span>WhatsApp Support</span>
                </div>
            </div>
        </div>
    )
}

export default ContactSupport