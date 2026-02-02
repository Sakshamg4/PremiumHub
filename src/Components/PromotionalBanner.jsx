import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OFFERS = [
    {
        id: 1,
        text: "🔥 LinkedIn Premium Business Plan Available @ 80% OFF",
        subtext: "Upgrade your career today",
        link: "/pricing",
        color: "from-blue-600 to-blue-400"
    },
    {
        id: 2,
        text: "🤖 Gemini AI Advanced Pro Plan",
        subtext: "Experience the power of Google's best AI",
        link: "/pricing",
        color: "from-purple-600 to-pink-400"
    },
    {
        id: 3,
        text: "💼 LinkedIn Sales Navigator Core",
        subtext: "Find the right leads, right now",
        link: "/pricing",
        color: "from-sky-600 to-cyan-400"
    }
];

const PromotionalBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show banner after a slight delay
        const timer = setTimeout(() => setIsVisible(true), 1000);
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
        <div className="fixed bottom-6 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl z-50">
            <div className="relative bg-[#0f172a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 overflow-hidden group">
                {/* Animated Background Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${currentOffer.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                <div className="relative flex items-center justify-between gap-4">
                    {/* Scrolling Text Section */}
                    <div className="flex-1 h-12 relative overflow-hidden flex flex-col justify-center">
                        {OFFERS.map((offer, index) => (
                            <div
                                key={offer.id}
                                className={`absolute w-full transition-all duration-500 ease-in-out flex flex-col justify-center
                                    ${index === currentIndex
                                        ? 'opacity-100 translate-y-0'
                                        : index < currentIndex
                                            ? 'opacity-0 -translate-y-full'
                                            : 'opacity-0 translate-y-full'
                                    }
                                    ${index !== currentIndex && 'pointer-events-none'}
                                `}
                            >
                                <p className="text-white font-bold text-sm md:text-base leading-tight">
                                    {offer.text}
                                </p>
                                <p className="text-slate-400 text-xs hidden md:block">
                                    {offer.subtext}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <Link
                        to="/pricing"
                        className="relative flex-none"
                    >
                        <span className={`
                            inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95
                            bg-gradient-to-r ${currentOffer.color}
                        `}>
                            Get Deal
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Link>

                    {/* Close Button (Optional UX improvement) */}
                    <button
                        onClick={() => setIsVisible(false)}
                        className="absolute -top-2 -right-2 p-1 bg-white/10 hover:bg-white/20 rounded-full text-white/50 hover:text-white transition-colors"
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
