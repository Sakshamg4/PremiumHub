import React, { useState, useEffect } from 'react';
import { FaTimes, FaWhatsapp, FaCommentDots } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ContactForm from './ContactForm';

const PopupForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const location = useLocation();

    // Check if we are on a single blog page where the sticky banner is present
    const isSingleBlog = location.pathname.startsWith('/blog/') && location.pathname.split('/').length > 2;

    useEffect(() => {
        const handleScroll = () => {
            if (isSingleBlog && window.scrollY > 400) {
                setIsBannerVisible(true);
            } else {
                setIsBannerVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSingleBlog]);

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

    const getBottomPosition = () => {
        if (isSingleBlog && isBannerVisible) {
            return 'bottom-[150px] sm:bottom-[90px]';
        }
        return 'bottom-6';
    };

    return (
        <div className={`fixed right-4 sm:right-6 z-[100] flex flex-col items-end gap-3 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${getBottomPosition()}`}>
            {/* Form Container */}
            <div
                className={`
                    origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
                    w-[85vw] max-w-[280px]
                    bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-xl overflow-hidden
                `}
            >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-10">
                        <FaWhatsapp className="w-16 h-16" />
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-1 right-1 p-2 text-white/80 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10 z-20"
                        aria-label="Close"
                    >
                        <FaTimes className="w-3.5 h-3.5" />
                    </button>

                    <h3 className="text-[0.95rem] font-bold mb-0.5 relative z-10">Contact Support</h3>
                    <p className="text-blue-100 text-[0.7rem] leading-tight relative z-10 w-[90%]">
                        Have a question? We'd love to help!
                    </p>
                </div>

                {/* Body */}
                <div className="p-4">
                    <ContactForm onSuccess={() => setIsOpen(false)} />
                    <p className="text-[9px] text-center text-slate-400 mt-2.5 font-medium">
                        Typical reply time: 2-4 hours
                    </p>
                    <a
                        href="https://chat.whatsapp.com/HV2nHlZXjBk2bbFgcR4sHQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center mt-1.5 text-[9px] font-bold text-green-600 hover:text-green-700 hover:underline transition-colors uppercase tracking-wide"
                    >
                        Join WhatsApp Community →
                    </a>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={toggleOpen}
                className={`
                    group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-lg hover:shadow-xl
                    transition-all duration-300 transform hover:scale-105 active:scale-95
                    ${isOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}
                    text-white pointer-events-auto cursor-pointer relative
                `}
                aria-label="Toggle Contact Form"
            >
                {isOpen ? (
                    <FaTimes className="w-4 h-4" />
                ) : (
                    <>
                        <FaCommentDots className="w-5 h-5 sm:w-5 sm:h-5" />
                        {/* Notification Dot */}
                        <span className="absolute top-0 right-0 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
                        </span>
                    </>
                )}
            </button>
        </div>
    );
};

export default PopupForm;
