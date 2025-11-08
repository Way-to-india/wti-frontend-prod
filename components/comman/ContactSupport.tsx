"use client";

const ContactSupport = ({title} : {title : string}) => {
    const handleWhatsAppRedirect = () => {
        const whatsappNumber = '918527255995';
        const message = `Hello! I'm interested in learning more about the tour: ${title || 'your tour'}.`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };
    return (
        <div className="mt-10 bg-linear-to-r from-gray-50 to-gray-100 rounded-lg p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Need Help with Your Booking?</h4>
                    <p className="text-sm text-gray-600">
                        Our support team is available 24/7 to assist you with any questions or concerns.
                    </p>
                </div>
                <button
                    className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap"
                    onClick={handleWhatsAppRedirect}
                >
                    Whatsapp Support
                </button>
            </div>
        </div>
    )
}

export default ContactSupport