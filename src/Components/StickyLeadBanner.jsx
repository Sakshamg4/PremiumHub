import React, { useState, useEffect } from 'react';
import { FaFileSignature } from 'react-icons/fa';

const StickyLeadBanner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const whatsappLink = "https://wa.me/919029151181?text=Hi%2C%20I%20want%20to%20inquire%20about%20premium%20tools%20pricing";

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div
            className={`fixed bottom-0 left-0 w-full z-[999] bg-slate-900 border-t border-slate-700/80 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between py-3 md:py-4 gap-4">

                    {/* Left Side Content */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full hidden sm:flex items-center justify-center shrink-0">
                            <FaFileSignature className="w-4 h-4" />
                        </div>
                        <div className="text-center sm:text-left w-full sm:w-auto">
                            <h4 className="font-bold text-white text-[0.95rem] md:text-[1.05rem] leading-tight mb-0.5">
                                Get Exclusive Quotes for Premium Tools
                            </h4>
                            <p className="text-slate-400 text-[0.8rem] md:text-[0.85rem] leading-tight m-0 hidden md:block">
                                Join our community to request custom pricing and dedicated support directly.
                            </p>
                        </div>
                    </div>

                    {/* Right Side Button */}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl transition-all duration-300 shadow-sm whitespace-nowrap active:scale-95 shrink-0"
                    >
                        Inquire Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StickyLeadBanner;
