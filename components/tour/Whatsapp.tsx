"use client";

import { handleWhatsAppRedirect } from '@/utils/WhatsappRedirect'
import { FaWhatsapp } from 'react-icons/fa'

const Whatsapp = ({ title }: { title: string }) => {
    return (
        <div
            onClick={() => handleWhatsAppRedirect(title)}
            rel="noopener noreferrer"
            className="cursor-pointer ml-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            aria-label="Contact us on WhatsApp"
        >
            <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
            <span>WhatsApp</span>
        </div>
    )
}

export default Whatsapp