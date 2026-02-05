import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OFFERS = [
    {
        id: 1,
        text: "LinkedIn Premium Business",
        subtext: "80% OFF • Limited Time Deal",
        link: "/pricing",
        color: "from-blue-600 to-blue-400"
    },
    {
        id: 2,
        text: "Gemini AI Pro",
        subtext: "Experience Google's Best AI",
        link: "/pricing",
        color: "from-purple-600 to-pink-400"
    },
    {
        id: 3,
        text: "LinkedIn Sales Navigator",
        subtext: "Find Leads Faster",
        link: "/pricing",
        color: "from-sky-600 to-cyan-400"
    }
];

const PromotionalBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
        }, 4000); // Change every 4 seconds

        return () => clearInterval(interval);
    }, []);

    const currentOffer = OFFERS[currentIndex];

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-32 left-3 right-3 md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-40 animate-fade-in-up">
            <div className="relative bg-[#0f172a] border border-slate-700/50 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-4 overflow-hidden group">

                {/* Glow Effect */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${currentOffer.color} opacity-20 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full pointer-events-none transition-colors duration-1000`} />

                <div className="relative flex items-center justify-between gap-4">
                    {/* Scrolling Text Section */}
                    <div className="flex-1 relative overflow-hidden">
                        <div className="h-11 relative">
                            {OFFERS.map((offer, index) => (
                                <div
                                    key={offer.id}
                                    className={`absolute w-full top-0 left-0 transition-all duration-500 ease-in-out flex flex-col justify-center
                                        ${index === currentIndex
                                            ? 'opacity-100 translate-y-0'
                                            : 'opacity-0 translate-y-4' // Simple fade slide
                                        }
                                        ${index !== currentIndex && 'pointer-events-none'}
                                    `}
                                >
                                    <h3 className="text-white font-bold text-[15px] leading-tight line-clamp-2 pr-1 mb-0.5">
                                        {offer.text}
                                    </h3>
                                    <p className="text-slate-400 text-xs truncate">
                                        {offer.subtext}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <Link
                        to="/pricing"
                        className="flex-none"
                    >
                        <span className="inline-flex items-center gap-1 px-5 py-2.5 bg-white text-slate-900 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-50 active:scale-95 transition-all">
                            Get Deal
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Link>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute -top-2 -right-2 p-1.5 bg-white/5 hover:bg-white/10 rounded-full text-slate-500 hover:text-white transition-colors"
                        aria-label="Close banner"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PromotionalBanner;
