import React, { useState, useEffect } from 'react';
import { FaTimes, FaWhatsapp, FaCommentDots } from 'react-icons/fa';
import ContactForm from './ContactForm';

const PopupForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Auto-open logic: Open every 5 minutes if closed
    useEffect(() => {
        let timeout;
        if (!isOpen) {
            timeout = setTimeout(() => {
                setIsOpen(true);
            }, 300000);
        }
        return () => clearTimeout(timeout);
    }, [isOpen]);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
            {/* Form Container */}
            <div
                className={`
                    origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
                    w-[90vw] max-w-[340px]
                    bg-white/90 backdrop-blur-xl border border-white/50 shadow-2xl rounded-2xl overflow-hidden
                `}
            >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FaWhatsapp className="w-20 h-20" />
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 p-2 text-white/80 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10 z-20"
                        aria-label="Close"
                    >
                        <FaTimes className="w-4 h-4" />
                    </button>

                    <h3 className="text-lg font-bold mb-1 relative z-10">Contact Support</h3>
                    <p className="text-blue-100 text-xs relative z-10 w-[90%]">
                        Have a question? We'd love to help!
                    </p>
                </div>

                {/* Body */}
                <div className="p-5">
                    <ContactForm onSuccess={() => setIsOpen(false)} />
                    <p className="text-[10px] text-center text-slate-400 mt-3 font-medium">
                        Typical reply time: 2-4 hours
                    </p>
                    <a
                        href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center mt-2 text-[10px] font-bold text-green-600 hover:text-green-700 hover:underline transition-colors uppercase tracking-wide"
                    >
                        Join WhatsApp Community →
                    </a>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleOpen}
                className={`
                    group flex items-center justify-center w-12 h-12 rounded-full shadow-lg hover:shadow-xl
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}
                    text-white pointer-events-auto cursor-pointer relative
                `}
                aria-label="Toggle Contact Form"
            >
                {isOpen ? (
                    <FaTimes className="w-5 h-5" />
                ) : (
                    <>
                        <FaCommentDots className="w-6 h-6" />
                        {/* Notification Dot */}
                        <span className="absolute top-0 right-0 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                        </span>
                    </>
                )}
            </button>
        </div>
    );
};

export default PopupForm;
