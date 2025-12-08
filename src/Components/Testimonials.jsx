import React, { useState, useEffect, useCallback } from 'react';
import { memo } from 'react';
import { useData } from '../context/DataContext';

const Testimonials = () => {
    const { testimonials } = useData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const prevTestimonial = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    return (
        <section className="py-10 md:py-8" id="testimonials">
            <div className="container mx-auto px-4">
                <div className="relative border-[1px] border-[#bcccdc]/50 rounded-xl p-8 md:p-12 bg-[#f8fafc]/90 overflow-hidden">

                    {/* Background Effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#f8fafc,#d9eafd)] opacity-50" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/30 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9aa6b2]/30 to-transparent" />
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Left Side: Text Content */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <span className="inline-block bg-[#d9eafd]/40 rounded-full px-4 py-1 mb-2 border border-[#bcccdc]/30">
                                    <p className="text-[#18181b] text-sm font-medium m-0 flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        Client Success Stories
                                    </p>
                                </span>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181b] leading-tight">
                                    Trusted by Professionals <br />
                                    <span className="text-[#52525b]">Across the Globe</span>
                                </h2>
                            </div>

                            <div className="relative min-h-[240px] md:min-h-[200px]">
                                {testimonials.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out transform
                      ${index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
                                    >
                                        <blockquote className="text-xl md:text-2xl text-[#52525b] font-medium leading-relaxed mb-6">
                                            "{item.feedback}"
                                        </blockquote>
                                        <div>
                                            <h4 className="text-lg font-bold text-[#18181b]">{item.name}</h4>
                                            <p className="text-[#52525b]">{item.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex items-center gap-4 pt-4">
                                <button
                                    onClick={() => {
                                        prevTestimonial();
                                        setIsAutoPlaying(false);
                                    }}
                                    className="p-3 rounded-full border border-[#bcccdc] text-[#18181b] hover:bg-[#d9eafd] transition-colors bg-white/50 backdrop-blur-sm"
                                    aria-label="Previous testimonial"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        nextTestimonial();
                                        setIsAutoPlaying(false);
                                    }}
                                    className="p-3 rounded-full border border-[#bcccdc] text-[#18181b] hover:bg-[#d9eafd] transition-colors bg-white/50 backdrop-blur-sm"
                                    aria-label="Next testimonial"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Progress Indicators */}
                                <div className="flex gap-2 ml-4">
                                    {testimonials.map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => {
                                                setCurrentIndex(idx);
                                                setIsAutoPlaying(false);
                                            }}
                                            className={`h-2 rounded-full transition-all duration-300 
                        ${idx === currentIndex ? 'w-8 bg-[#18181b]' : 'w-2 bg-[#bcccdc]'}`}
                                            aria-label={`Go to testimonial ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Mobile Screenshot Image */}
                        <div className="relative flex justify-center lg:justify-end">
                            {/* Phone Frame Mockup */}
                            <div className="relative w-[260px] md:w-[300px] aspect-[9/19] bg-[#18181b] rounded-[3rem] p-3 shadow-2xl border-4 border-[#27272a] transform rotate-0 hover:rotate-[-2deg] transition-transform duration-500">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-[#18181b] rounded-b-2xl z-20"></div>

                                {/* Screen Content */}
                                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                                    {testimonials.map((item, index) => (
                                        <img
                                            key={item.id}
                                            src={item.image}
                                            alt={`Screenshot feedback from ${item.name}`}
                                            width="300"
                                            height="600"
                                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out
                        ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                                        />
                                    ))}

                                    {/* Overlay Gradient for better integration */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements behind phone */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#d9eafd]/40 via-[#bcccdc]/30 to-transparent rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default memo(Testimonials);
