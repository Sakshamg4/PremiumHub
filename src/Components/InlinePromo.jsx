import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OFFERS = [
    {
        id: 1,
        text: "🔥 LinkedIn Premium Business Plan 12 Months",
        subtext: "Original Price ₹23,000 • Get it ₹8XXX",
        color: "from-blue-600 to-blue-400"
    },
    {
        id: 2,
        text: "🤖 Gemini AI Advanced Pro Plan",
        subtext: "Original Price ₹19,500 • Get it ₹8XXX",
        color: "from-purple-600 to-pink-400"
    },
    {
        id: 3,
        text: "💼 LinkedIn Sales Navigator Core",
        subtext: "Original Price ₹80,000 • Get it ₹2XXXX",
        color: "from-sky-600 to-cyan-400"
    },
    {
        id: 4,
        text: "🎨 Canva Pro Lifetime Access",
        subtext: "Original Price ₹3,999 • Get it ₹4XX",
        color: "from-indigo-500 to-purple-500"
    },
    {
        id: 6,
        text: "📚 Coursera Plus Annual Plan",
        subtext: "Original Price ₹33,000 • Get it ₹2XXX",
        color: "from-blue-700 to-indigo-600"
    },
    {
        id: 7,
        text: "✨ Adobe Creative Cloud All Apps",
        subtext: "Original Price ₹59,000 • Get it ₹4XXX",
        color: "from-red-600 to-orange-500"
    }
];

const InlinePromo = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentOffer = OFFERS[currentIndex];

    return (
        <div className="my-8 relative overflow-hidden rounded-2xl bg-[#0f172a] shadow-xl shadow-blue-900/5 group border border-slate-800/50">
            {/* Background Effects */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${currentOffer.color} opacity-10 blur-[80px] rounded-full pointer-events-none transition-colors duration-500`} />

            <div className="relative px-5 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 sm:gap-6">

                {/* Text Content - Animated */}
                <div className="flex-1 overflow-hidden h-[5.5rem] sm:h-[3.5rem] relative flex flex-col justify-center">
                    {OFFERS.map((offer, index) => {
                        let transformClass = 'translate-y-12 opacity-0'; // Default: Waiting below (coming soon)

                        if (index === currentIndex) {
                            transformClass = 'translate-y-0 opacity-100'; // Active
                        } else if (index < currentIndex) {
                            transformClass = '-translate-y-12 opacity-0'; // Passed (gone up)
                        }

                        // Handle Loop Wrap-around (Last Item -> First Item)
                        // When current is 0, the Last Item (7) should appear to have "gone up" (prev)
                        if (currentIndex === 0 && index === OFFERS.length - 1) {
                            transformClass = '-translate-y-12 opacity-0';
                        }

                        return (
                            <div
                                key={offer.id}
                                className={`absolute w-full transition-all duration-700 ease-[cubic-bezier(0.2,0,0,1)] flex flex-col justify-center ${transformClass}`}
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`inline-block w-1.5 h-1.5 rounded-full bg-gradient-to-r ${offer.color}`} />
                                    <span className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-400`}>Recommended Deal</span>
                                </div>
                                <h4 className="font-bold text-white text-[15px] sm:text-lg tracking-tight leading-tight sm:leading-none line-clamp-2 sm:truncate">
                                    {offer.text}
                                </h4>
                                <p className="text-slate-400 text-xs sm:text-sm font-medium mt-0.5 sm:mt-1 whitespace-normal sm:truncate leading-snug">
                                    {offer.subtext}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Vertical Separator (Desktop) */}
                <div className="hidden sm:block w-px h-12 bg-slate-800" />

                {/* CTA Button */}
                <a
                    href={`https://wa.me/919029151181?text=${encodeURIComponent(`Hello PremiumToolsHub, I am interested in ${currentOffer.text}. Please share more details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex-none group/btn"
                >
                    <span className="absolute inset-0 bg-white/10 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    <span className={`
                        relative flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm text-[#0f172a] shadow-lg transition-all duration-300 transform group-hover/btn:scale-105
                        bg-white whitespace-nowrap
                    `}>
                        Get Deal
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    );
};

export default InlinePromo;
