import React, { useState, useEffect } from 'react';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import ContactForm from './ContactForm';

const PopupForm = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show popup after 3 seconds
        const timer = setTimeout(() => {
            // Check session storage to prevent showing too often in one session
            const hasSeenPopup = sessionStorage.getItem('activePopupSeen');
            if (!hasSeenPopup) {
                setIsVisible(true);
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('activePopupSeen', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl p-8 overflow-hidden animate-[fadeInUp_0.5s_ease-out]">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
                >
                    <FaTimes className="w-4 h-4" />
                </button>

                {/* Header Content */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 text-blue-600 mb-4 shadow-sm border border-blue-100">
                        <FaWhatsapp className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">Join Premium Hub</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Unlock exclusive deals on AI tools, LinkedIn Premium, and OTT subscriptions.
                    </p>
                </div>

                {/* Form */}
                <ContactForm onSuccess={handleClose} />

                <p className="text-xs text-center text-slate-400 mt-5 font-medium">
                    Join 750+ professionals. No spam, ever.
                </p>
            </div>

            {/* Animation Keyframes */}
            <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        </div>
    );
};

export default PopupForm;
