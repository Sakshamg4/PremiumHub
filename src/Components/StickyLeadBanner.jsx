import React from 'react';
import { FaFileSignature } from 'react-icons/fa';

const StickyLeadBanner = () => {
    const whatsappLink = "https://wa.me/919029151181?text=Hi%2C%20I%20want%20to%20inquire%20about%20premium%20tools%20pricing";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-fade-in-up shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">

            {/* Mobile View - White Background, Green Pill Button */}
            <div className="md:hidden bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <style>
                    {`
                        @keyframes mild-scale {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.02); }
                        }
                    `}
                </style>
                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold py-3.5 rounded-full shadow-xl transition-transform active:scale-95 text-center"
                    style={{ animation: 'mild-scale 2s infinite ease-in-out' }}
                >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                        <FaFileSignature className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm tracking-wide leading-tight">
                        Get Exclusive Quotes for Premium Tools
                    </span>
                </a>
            </div>

            {/* Desktop View - White Background, Split Layout */}
            <div className="hidden md:block bg-white border-t border-slate-200 py-2 px-2">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Left Side Text */}
                    <div className="text-[#101828] font-bold text-md tracking-tight">
                        Get Exclusive Quotes for Premium Tools
                    </div>

                    {/* Right Side Button */}
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
                            group flex items-center gap-2.5 px-6 py-2.5 
                            bg-white text-[#101828] font-semibold text-sm rounded-lg
                            border border-[#101828] hover:bg-slate-50 transition-all duration-300
                            shadow-sm hover:shadow-md
                        "
                    >
                        <FaFileSignature className="w-4 h-4 transition-transform group-hover:scale-110" />
                        <span>Inquire Now</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default StickyLeadBanner;
